import * as aws_amplify from "@aws-cdk/aws-amplify-alpha";
import * as aws_codebuild from "aws-cdk-lib/aws-codebuild";
import * as aws_elasticbeanstalk from "aws-cdk-lib/aws-elasticbeanstalk";
import * as aws_s3_assets from "aws-cdk-lib/aws-s3-assets";
// import * as aws_iam from "aws-cdk-lib/aws-iam";
import * as path from "path";

import { SecretValue, Stack, StackProps} from "aws-cdk-lib";
import { Construct } from "constructs";

export class YouTubeMainStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const initials = "PM";

    // -------------------------------------------------------------
    // IAM
    // -------------------------------------------------------------
    // const iamRoleForElasticBeanstalk = new aws_iam.Role(this, `${initials}-elastic-beanstalk-iam-role`, {
    //   assumedBy: new aws_iam.ServicePrincipal("ec2.amazonaws.com"),
    //   roleName: "aws-elasticbeanstalk-ec2-role",
    //   managedPolicies: [
    //     aws_iam.ManagedPolicy.fromAwsManagedPolicyName("AWSElasticBeanstalkWebTier"),
    //     aws_iam.ManagedPolicy.fromAwsManagedPolicyName("AWSElasticBeanstalkMulticontainerDocker"),
    //     aws_iam.ManagedPolicy.fromAwsManagedPolicyName("AWSElasticBeanstalkWorkerTier"),
    //   ]
    // });

    // -------------------------------------------------------------
    // ElasticBeanstalk
    // -------------------------------------------------------------
    const appName = `${initials}-backend`;

    const app = new aws_elasticbeanstalk.CfnApplication(this, `${initials}-elastic-beanstalk-app`, {
      applicationName: appName,
    });

    const appArchive = new aws_s3_assets.Asset(this, `${initials}-elastic-beanstalk-code`, {
      path: path.join(__dirname, "../../backend"),
    })

    const optionSettingProperties: aws_elasticbeanstalk.CfnEnvironment.OptionSettingProperty[] = [
      {
        namespace: "aws:autoscaling:launchconfiguration",
        optionName: "InstanceType",
        value: "t3.small",
      },
      {
        namespace: "aws:autoscaling:launchconfiguration",
        optionName: "IamInstanceProfile",
        // Here you could reference an instance profile by ARN (e.g. myIamInstanceProfile.attrArn)
        // For the default setup, leave this as is (it is assumed this role exists)
        // https://stackoverflow.com/a/55033663/6894670
        value: "aws-elasticbeanstalk-ec2-role",
      },
    ];

    const appVersionProps = new aws_elasticbeanstalk.CfnApplicationVersion(this, `${initials}-elastic-beanstalk-app-version`, {
      applicationName: appName,
      sourceBundle: {
        s3Bucket: appArchive.s3BucketName,
        s3Key: appArchive.s3ObjectKey,
      },
    });

    const env = new aws_elasticbeanstalk.CfnEnvironment(this, `${initials}-elastic-beanstalk-env`, {
      applicationName: appName,
      solutionStackName: "64bit Amazon Linux 2 v5.6.1 running Node.js 16",
      optionSettings: optionSettingProperties,
      versionLabel: appVersionProps.ref,
    });

    // app.addDependsOn(iamRoleForElasticBeanstalk);
    appVersionProps.addDependsOn(app);
    env.addDependsOn(app);

    // -------------------------------------------------------------
    // Amplify
    // -------------------------------------------------------------
    const amplifyApp = new aws_amplify.App(this, `${initials}-amplify-app`, {
      sourceCodeProvider: new aws_amplify.GitHubSourceCodeProvider({
        repository: "agh-aws-tasks",
        oauthToken: SecretValue.secretsManager("pm-github-token"),
        owner: "piotrmoszkowicz",
      }),
      buildSpec: aws_codebuild.BuildSpec.fromObject({
        version: 1,
        frontend: {
          phases: {
            preBuild: {
              commands: [
                "cd frontend",
                "npm i --force",
              ],
            },
            build: {
              commands: ["npm run build"],
            },
          },
          artifacts: {
            baseDirectory: "frontend/build",
            files: ["**/*"],
          },
        },
      }),
    });

    amplifyApp.addBranch("task1");

    amplifyApp.addCustomRule(
      aws_amplify.CustomRule.SINGLE_PAGE_APPLICATION_REDIRECT
    );

    amplifyApp.addEnvironment("REACT_APP_BASE_API_URL", "test");
  }
}

import { CfnOutput, Construct, Stack, StackProps } from '@aws-cdk/core'
import { NodejsFunction } from 'aws-lambda-nodejs-esbuild'
import { Runtime } from '@aws-cdk/aws-lambda'
import { RetentionDays } from '@aws-cdk/aws-logs'
import { DomainName, HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2'
import { LambdaProxyIntegration } from '@aws-cdk/aws-apigatewayv2-integrations'
import { BuildOptions } from 'esbuild'

const esbuildOptions: BuildOptions = {
  target: 'node12',
}

export class GetStatDashboardStack extends Stack {
  constructor (scope: Construct, id: string, props: StackProps) {
    super(scope, id, props)
    const mainHandler = new NodejsFunction(this, 'MainHandler', {
      runtime: Runtime.NODEJS_12_X,
      rootDir: 'src',
      handler: 'index.main',
      esbuildOptions,
      logRetention: RetentionDays.TWO_WEEKS
    })

    const allSitesHandler = new NodejsFunction(this, 'AllSitesHandler', {
      runtime: Runtime.NODEJS_12_X,
      rootDir: 'src',
      handler: 'allSites.main',
      esbuildOptions,
      logRetention: RetentionDays.TWO_WEEKS
    })

    const allProjectsHandler = new NodejsFunction(this, 'AllProjectsHandler', {
      runtime: Runtime.NODEJS_12_X,
      rootDir: 'src',
      handler: 'allProjects.main',
      esbuildOptions,
      logRetention: RetentionDays.TWO_WEEKS
    })

    const projectHandler = new NodejsFunction(this, 'ProjectHandler', {
      runtime: Runtime.NODEJS_12_X,
      rootDir: 'src',
      handler: 'project.main',
      esbuildOptions,
      logRetention: RetentionDays.TWO_WEEKS
    })

    const tagsHandler = new NodejsFunction(this, 'TagsHandler', {
      runtime: Runtime.NODEJS_12_X,
      rootDir: 'src',
      handler: 'tags.main',
      esbuildOptions,
      logRetention: RetentionDays.TWO_WEEKS
    })

    const api = new HttpApi(this, id);
    api.addRoutes({
      methods: [HttpMethod.GET],
      integration: new LambdaProxyIntegration({ handler: mainHandler }),
      path: '/'
    })

    api.addRoutes({
      methods: [HttpMethod.GET],
      integration: new LambdaProxyIntegration({ handler: allSitesHandler }),
      path: '/{apiKey}/allSites'
    })

    api.addRoutes({
      methods: [HttpMethod.GET],
      integration: new LambdaProxyIntegration({ handler: allProjectsHandler }),
      path: '/{apiKey}/allProjects'
    })

    api.addRoutes({
      methods: [HttpMethod.GET],
      integration: new LambdaProxyIntegration({ handler: projectHandler }),
      path: '/{apiKey}/project/{projectId}'
    })

    api.addRoutes({
      methods: [HttpMethod.GET],
      integration: new LambdaProxyIntegration({ handler: tagsHandler }),
      path: '/{apiKey}/site/{siteId}/tags'
    })

    api.addRoutes({
      methods: [HttpMethod.GET],
      integration: new LambdaProxyIntegration({ handler: allProjectsHandler }),
      path: '/processAPIKey'
    })
  }
}
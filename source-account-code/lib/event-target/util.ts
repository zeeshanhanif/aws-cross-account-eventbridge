import * as events from '@aws-cdk/aws-events';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import { ConstructNode, IConstruct, Names } from '@aws-cdk/core';

import { Construct } from '@aws-cdk/core';

/**
 * Obtain the Role for the EventBridge event
 *
 * If a role already exists, it will be returned. This ensures that if multiple
 * events have the same target, they will share a role.
 */
export function singletonEventRole(scope: IConstruct, policyStatements: iam.PolicyStatement[]): iam.IRole {
  const id = 'EventsRole';
  const existing = scope.node.tryFindChild(id) as iam.IRole;
  if (existing) { return existing; }

  const role = new iam.Role(scope as Construct, id, {
    assumedBy: new iam.ServicePrincipal('events.amazonaws.com'),
  });

  policyStatements.forEach(role.addToPolicy.bind(role));

  return role;
}
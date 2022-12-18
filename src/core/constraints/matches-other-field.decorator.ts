import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
@ValidatorConstraint()
export class MatchesOtherFieldConstraint
  implements ValidatorConstraintInterface
{
  validate(
    value: any,
    { constraints, object }: ValidationArguments,
  ): boolean | Promise<boolean> {
    const [relatedPropertyName] = constraints;
    const relatedValue = (object as any)[relatedPropertyName];
    return value === relatedValue;
  }
  defaultMessage?(): string {
    throw new Error('Fields do not match.');
  }
}

export function MatchesOtherField(
  relatedField: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [relatedField],
      validator: MatchesOtherFieldConstraint,
    });
  };
}

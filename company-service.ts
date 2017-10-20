import * as transformer from 'velson';
import * as fs from 'fs';

export function getCompanies(event: any, context: any, callback: any): void {

  const templatePath = './template.vm';
  const requestFilePath = './sample.json';
  const engine = new transformer.VelsonEngine();
  let transformedOutput: any;
  let responseBody: any;
  let response: any;

  try {
    engine.initialize(templatePath, requestFilePath);
    transformedOutput = engine.transform();
    response = {
      statusCode: 200,
      body: JSON.stringify(transformedOutput)
    };
    callback(null, response);
  } catch(error) {
    responseBody = {
      httpStatus: 400,
      code: 10,
      message: 'Error generating token',
      developerMessage: error.message,
    };

    response = {
      statusCode: 200,
      body: JSON.stringify(responseBody)
    };
    callback(null, response);
  }
}

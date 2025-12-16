import { ScullyConfig, RouteTypes } from '@scullyio/scully';

export const config: ScullyConfig = {
  projectName: 'rsbusinesstech-ui',
  projectRoot: './src',
  outDir: './dist/static',
  defaultPostRenderers: [],
  routes: {
    '/web-design-kuala-lumpur': {
      type: 'default'
    }
//     '/business-software-solutions-kuala-lumpur': {
//       type: 'default'
//     },
 
  }
};

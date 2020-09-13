const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const { data } = await graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            shopifyId
            handle
          }
        }
      }
    }
  `);

  data.allShopifyProduct.edges.forEach(({ node }) => {
    createPage({
      path: `products/${node.handle}`,
      component: path.resolve(`./src/templates/ProductTemplate/index.js`),
      context: {
        shopifyId: node.shopifyId,
      },
    });
  });
};

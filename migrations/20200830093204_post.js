exports.up = async function(knex) {
    console.log('Init post');
    await knex.schema.createTable('post', table => {
        table
            .uuid('postId')
            .primary();

        table
          .text('title');

        table
          .text('body');
        
        table
          .text('shortDescription');            
        
        table
          .text('longDescription');
        
        table
          .text('imageUrl');
        
        table
          .timestamp('createdAt');
        
        table
          .timestamp('updatedAt');
        
          table
          .string('publishStatus');          
    });
  };
  
exports.down = async function(knex) {
  await knex.schema.dropTable('post');
};
module.exports = {
    productList: {
      query: `SELECT 1 , board_hits, file_attached, created_time, id, board_writer, board_contents, board_pass, board_title FROM board_table`
    },
    signUp: {
      query: 'insert into t_user set ? on duplicate key update ?'
    },
  }
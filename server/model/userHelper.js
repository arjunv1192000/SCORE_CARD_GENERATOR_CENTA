import db from '../config/db.js';


const userhelper={
    userExist: async (email) => {
        try {
          const query = 'SELECT * FROM student_card_data WHERE student_email = $1';
          const { rows } = await db.pool.query(query, [email]);
    
          
    
          if (rows.length === 0) {
    
            return null;
          }
    
    
          return rows;
    
    
    
        } catch (error) {
          console.error('Error:', error);
        }
      },
      getuserdata: async (email) => {
        try {
          const query = 'SELECT * FROM student_card_data WHERE student_email = $1';
          const { rows } = await db.pool.query(query, [email]);
      
          console.log(rows,"single user");
      
          if (rows.length === 0) {
      
            return null;
          }
      
      
          return rows;
      
      
      
        } catch (error) {
          console.error('Error:', error);
        }
      },
    

}
export default userhelper
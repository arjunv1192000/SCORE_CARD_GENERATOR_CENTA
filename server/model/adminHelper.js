import db from '../config/db.js';


const adminHelper ={

  Login: async (username) => {
    try {
      const query = 'SELECT * FROM admin WHERE username = $1';
      const { rows } = await db.pool.query(query, [username]);

      console.log(rows);

      if (rows.length === 0) {

        return null;
      }


      return rows;



    } catch (error) {
      console.error('Error:', error);
    }
  },

  Adduserdata: async (data) => {

    try{
      const insertQuery = `
      INSERT INTO student_data (
        student_fullname,
        student_email,
        student_phone,
        subject,
        test_taking_date,
        full_marks,
        marks_obtained,
        overall_percentage
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    for (const item of data) {
      const values = [
        item.Fullname,
        item.Email,
        item.Phone,
        item.Subject,
        new Date(item.TestDate), 
        item.Fullmark,
        item.Markobtained,
        item.Overallpercentage,  
      ];
  
      await db.pool.query(insertQuery, values);
    }
    return { success: true };

    }catch (error) {
      console.error('Error:', error);
    }
   
  },
  getAlluserdata:async()=>{
    try{
      const selectQuery = `SELECT * FROM student_data`;
      const { rows } = await db.pool.query(selectQuery);

      if (rows.length === 0) {

        return null;
      }

      

      return rows;




    }catch (error) {
      console.error('Error:', error);
    }
  },

  generaeteScoreCard:async()=>{
    try{

      const selectQuery = `
      SELECT
        student_fullname,
        student_email,
        student_phone,
        subject,
        test_taking_date,
        full_marks,
        marks_obtained,
        student_id
      FROM student_data
      WHERE overall_percentage >= 60;
    `;

    const { rows } = await db.pool.query(selectQuery);

    if (rows.length === 0) {
      console.log('No records meet the condition.');
      return;
    }
    console.log(rows,);

    for (const row of rows) {
      const { student_fullname, student_email, student_phone, subject, test_taking_date, full_marks, marks_obtained, student_id } = row;

      const insertQuery = `
  INSERT INTO student_card_data (
    student_fullname,
    student_email,
    student_phone,
    subject,
    test_taking_date,
    full_marks,
    marks_obtained,
    student_id
  )
  SELECT
    $1, CAST($2 AS VARCHAR), $3, $4, $5, $6, $7, $8
    WHERE NOT EXISTS (
      SELECT 1
      FROM student_card_data
      WHERE student_email = CAST($2 AS VARCHAR)
  );
`;

await db.pool.query(insertQuery, [
  student_fullname,
  student_email,
  student_phone,
  subject,
  test_taking_date,
  full_marks,
  marks_obtained,
  student_id,
]);


    }

    const retrieveStudentemail = `
      SELECT student_fullname, student_email
      FROM student_card_data;
    `;

    const { rows: studentDataRows } = await db.pool.query(retrieveStudentemail);

    if (studentDataRows.length === 0) {
      console.log('No student data found.');
      return [];
    }

    const studentData = studentDataRows.map((row) => ({
      student_fullname: row.student_fullname,
      student_email: row.student_email,
    }));

   

    return studentData; 


    }catch (error) {
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
export default adminHelper
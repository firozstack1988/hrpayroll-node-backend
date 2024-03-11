 
const dbpool= require("../config/db");
 
const getHoliday=(req,res)=>{
    var holiData=[];
    let sql="select * from holidays";
    dbpool.query(sql,(err,result)=>{
        if(err)
            console.log(err);        
        else
        res.json(result);              
    });   
}

 

const createHoliday=(req,res)=>{
    var holi=req.body;
    var holiData=[holi.created_by,holi.created_on,holi.month,holi.numberOfHoliday,holi.year];
    let sql="INSERT INTO holidays (created_by, created_on, month, number_of_holiday, year)VALUES(?)";
   console.log(holiData);
    dbpool.query(sql,[holiData],(err,result)=>{
        if(err)
            console.log(err);        
        else
            res.status(200).json(result); 
})
}

module.exports={getHoliday,createHoliday};
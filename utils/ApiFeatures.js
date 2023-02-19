class ApiFeatures {
    constructor(mongooseQuery, queryString) {
      this.mongooseQuery = mongooseQuery;
      this.queryString = queryString;
    }
    ///////////////////// pagination //////////////////////////////////////////////
    paginate() {
      let page = this.queryString.page * 1 || 1;
      if (page < 0) page = 1;
      let limit = 5;
      let skip = (page - 1) * limit;
      this.mongooseQuery.skip(skip).limit(limit);
      this.page =  page
      return this;
    }
  
    ///////////////////// filter //////////////////////////////////////////////
    filter() {
      let queryString = { ...this.queryString };
      let excludedQuery = ["page", "sort", "keyword", "fields"];
      excludedQuery.forEach((elm) => {
        delete queryString[elm];
      });
  
      queryString = JSON.stringify(queryString);
      queryString = queryString.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      queryString = JSON.parse(queryString);
  
      this.mongooseQuery.find(queryString)
      // {price:{$lte:200}}
      return this
    }
  
    sort(){
        ///////////////////// sort //////////////////////////////////////////////
    if (this.queryString.sort) {
      let sortedBy = this.queryString.sort.split(",").join(" ");
      console.log(sortedBy);
      this.mongooseQuery.sort(sortedBy);
    }
    // mongooseQuery.sort("-price quantity")
    return this;
    }
  
    search(){
        ///////////////////// search //////////////////////////////////////////////
    if (this.queryString.keyword) {
      console.log(this.queryString.keyword);
      let keyword = this.queryString.keyword;
      this.mongooseQuery.find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      });
    }
  return this
    }
  
    select(){
        ///////////////////// select //////////////////////////////////////////////
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    }
    // mongooseQuery.select("name -_id price")
  
  return this
  
    }
  
    }
  
  module.exports = ApiFeatures
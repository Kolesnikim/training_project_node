const Tour = require('../models/tourModel');

class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    let copyQuery = { ...this.queryStr };

    // removing sorting parameters
    const excludedParams = ['page', 'sort', 'limit', 'fields'];
    excludedParams.forEach(el => delete copyQuery[el]);

    // changing gte and lte params
    copyQuery = JSON.stringify(copyQuery).replace(
      /\b(gte)|(gt)|(lte)|(lt)\b/g,
      match => `$${match}`
    );

    // query execution
    this.query = Tour.find(JSON.parse(copyQuery));
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortParams = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortParams);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  selectedFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = +this.queryStr.page || 1;
    const limit = +this.queryStr.limit || 8;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    if (this.queryStr.page) {
      const numPage = Tour.countDocuments();
      if (numPage < skip) {
        throw new Error('This page does nit exist');
      }
    }
    return this;
  }
}

module.exports = APIFeatures;

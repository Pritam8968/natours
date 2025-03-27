class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1) Filtering
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(f => delete queryObj[f]);

    // 2) Advanced Filtering
    // prepend $ before (gt, gte, lt, lte) operators
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      match => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryString));

    return this; // to chain methods
  }

  sort() {
    // 3) Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this; // to chain methods
  }

  limitFields() {
    // 4) Field limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields); // *PROJECTING
    } else {
      this.query = this.query.select('-__v'); // exclude __v field
    }
    return this; // to chain methods
  }

  paginate() {
    // 5) Pagintaion
    const { page = 1, limit = 100 } = this.queryString;
    const skipCount = (page - 1) * limit;
    this.query = this.query.skip(skipCount).limit(limit);

    return this; // to chain methods
  }
}
module.exports = APIFeatures;

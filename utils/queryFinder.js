class queryFinder {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            title: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {};
        this.query = this.query.find({...keyword});
        return this
    }

    sort() {
        if (this.queryStr.sort && this.queryStr.sort === "LTH") {
            this.query = this.query.find().sort({price: 1});
            return this;
        } else if (this.queryStr.sort && this.queryStr.sort === "HTL") {
            this.query = this.query.find().sort({price: -1});
            return this;
        } else if (this.queryStr.sort && this.queryStr.sort === "reset") {
            this.query = this.query.find();
            return this;
        } else {
            this.query = this.query;
            return this;
        }
    }


    filter() {
        const queryCopy = {...this.queryStr};
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach(ele => delete queryCopy[ele]);
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (ele) => `$${ele}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query = this.query.limit(resPerPage).skip(skip)
        return this
    }
}

module.exports = queryFinder
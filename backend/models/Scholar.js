const mongoose = require('mongoose');

const ScholarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  orcid: {
    type: String,
  },
  googleScholar: {
    type: String,
  },
  sciencedirect: {
    type: String,
  },
  scopus: {
    type: String,
  },
  researchWorks: {
    articles: {
      type: Number,
      default: 0,
    },
    journals: {
      type: Number,
      default: 0,
    },
    bookChapters: {
      type: Number,
      default: 0,
    },
    conferences: {
      type: Number,
      default: 0,
    },
    workshops: {
      type: Number,
      default: 0,
    },
  },
});

module.exports = mongoose.model('Scholar', ScholarSchema);
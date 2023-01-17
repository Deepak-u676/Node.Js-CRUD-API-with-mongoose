const mongoose = require('mongoose')

//  Model that will define our database structure.
const dataSchema = new mongoose.Schema({
  company_name: {
    required: true,
    type: String
  },
  employee: {
    first_name: {
      required: true,
      type: String
    },
    last_name: {
      required: true,
      type: String
    },
    employee_id: {
      required: true,
      type: Number
    },
    job_id: {
      required: true,
      type: Number
    },
    department_id: {
      required: true,
      type: Number
    },
    manager_id: {
      required: true,
      type: Number
    },
    age: {
      required: true,
      type: Number
    },
    email: {
      required: true,
      type: String
    },
    phone_number: {
      required: true,
      type: Number
    },
    hire_date: {
      type: Date,
      default: Date.now()
    }
  },

  address: {
    street: {
      required: true,
      type: String
    },
    city: {
      required: true,
      type: String
    },
    pincode: {
      required: true,
      type: Number
    }
  },
  company_website: {
    required: true,
    type: String
  }
})

module.exports = mongoose.model('Data', dataSchema)

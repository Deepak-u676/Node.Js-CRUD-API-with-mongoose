const express = require('express')
const Model = require('../model/model')
const router = express.Router()

// Post method
router.post('/post', async (req, res) => {
  let company_name = req.query.company_name
  let employee = {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
    employee_id: req.query.employee_id,
    job_id: req.query.job_id,
    department_id: req.query.department_id,
    manager_id: req.query.manager_id,
    age: req.query.age,
    email: req.query.email,
    phone_number: req.query.phone_number,
    hire_date: req.query.hire_date
  }
  let address = {
    street: req.query.street,
    city: req.query.city,
    pincode: req.query.pincode
  }
  let company_website = req.query.company_website

  const data = {
    company_name: company_name,
    employee: employee,
    address: address,
    company_website: company_website
  }

  try {
    const result = await data.save()
    res.status(200).json({
      Status_Code: 200,
      Response_Message: `user has been created successfully`,
      result
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get All the Data & Filtering Get All the Data
router.get('/getAll', async (req, res, next) => {
  try {
    const result = await Model.find()
    console.log(result)
    const filter = req.query
    const results = result.filter(user => {
      let isValid = true
      for (key in filter) {
        isValid =
          isValid &&
          user[key]
            ?.toLocaleLowerCase()
            .includes(filter[key].toLocaleLowerCase())
      }
      return isValid
    })
    // const totalUsers = await Model.countDocuments({});
    res.json({
      TotalUsers: results.length,
      Status_Code: 200,
      Response_Message: 'user GET request successfully',
      results
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// sorting GET Method all data
router.get('/users/:  ', async (req, res) => {
  try {
    const query = req.params.query
    const data = await Model.find()
    if (query.toLocaleLowerCase() === 'ascending') {
      res.json({ totalUsers: data.length, data })
    } else if (query.toLocaleLowerCase() === 'descending') {
      const descending = data.reverce()
      res.json({ totalUsers: descending.length, descending })
    }
  } catch (error) {
    res.status.apply(500).json({ message: error.message })
  }
})

// User Update by id method
router.patch('/updateById/:id', async (req, res) => {
  let companyName = req.query.companyName
  let userName = req.query.userName
  let age = req.query.age
  let email = req.query.email
  let phone = req.query.phone
  let pincode = req.query.pincode
  let subscriptionId = req.query.subscriptionId
  let date = req.query.date
  try {
    const updateData = {
      companyName: companyName,
      userName: userName,
      age: age,
      email: email,
      phone: phone,
      pincode: pincode,
      subscriptionId: subscriptionId,
      date: date
    }
    const id = req.query.id
    const options = { new: true }
    const result = await Model.findByIdAndUpdate(id, updateData, options)
    res.send({
      Status_Code: 200,
      Response_Message: `user has been updated successfully`,
      result
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// User Delete by id method
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id
    const data = await Model.findByIdAndDelete(id)
    console.log(data)
    res.status(200).json({
      id: `${data.id}`,
      Status_Code: 200,
      status: `user has been deleted successfully`
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DeleteAll users in database
router.delete('/deleteAll', async (req, res) => {
  try {
    const data = await Model.deleteMany()
    console.log(data)
    res.status(200).json({
      Status_Code: 200,
      status: `All user deleted in database successfully`
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get Data besed on the id.
router.get('/getById/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  try {
    const result = await Model.findById(req.params.id)
    res.send({
      Status_Code: 200,
      Response_Message: `user GET request with Id `,
      result
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update user by id in put method
router.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updateData = req.body
    const options = { new: true }
    const result = await Model.findByIdAndUpdate(id, updateData, options)
    res.send({
      Status_Code: 200,
      Response_Message: `user has been updated successfully`,
      result
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Paginaction Get All the Data Sorting
function paginactedData () {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const skipIndex = (page - 1) * limit
    const data = {}
    try {
      data.results = await Model.find()
        .sort({ _id: 1 })
        .limit(limit)
        .skip(skipIndex)
        .exec()
      res.paginactedData = { pageNumber: page, data }
      next()
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
// All paginactedData GET Method
router.get('/users', paginactedData(), (req, res) => {
  const result = res.paginactedData
  res.json({ Users: result.data.results.length, result })
})

module.exports = router

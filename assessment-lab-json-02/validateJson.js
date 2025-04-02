const fs = require('fs')
const { Validator } = require('jsonschema')

const schemaFile = "productSchema.json"
const productFile = "product.json"

const schema = JSON.parse(fs.readFileSync(schemaFile))
const productJson = JSON.parse(fs.readFileSync(productFile))

const validator = new Validator()

const res = validator.validate(productJson, schema)

if (res.errors.length > 0) {
    console.error("Validation failed:", res.errors);
} else {
    console.log("Validation sucessful!")
}
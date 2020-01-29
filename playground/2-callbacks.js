// setTimeout(() => {
//   console.log('Two seconds are up!')
// }, 2000)

// const names = ['Vishal', 'Varsha', 'Shreya', 'Krishna']
// const shortNames = names.filter(name => {
//   return name.length <= 6
// })

// const geocode = (address, callback) => {
//   setTimeout(() => {
//     const data = {
//       latitude: 0,
//       longitude: 0
//     }

//     callback(data)
//   }, 2000)
// }

// geocode('Jaipur', data => {
//   console.log(data)
// })

//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add = (num1, num2, callback) => {
    setTimeout(() => {
        const sum = num1 + num2
        callback(sum)
    }, 2000);
}

const product = (num1, num2, callback) => {
    setTimeout(() => {
        const product = num1 * num2
        callback(product)
    }, 1500);
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})

product (2, 3, (product) => {
    console.log(`Percentage = ${product/100}%`);
})
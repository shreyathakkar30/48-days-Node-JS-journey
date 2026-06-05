function add(a, b){
    return a + b;
}
//whenever you create a function you have to export that function
function sub(a, b){
    return a -b;
}
//Simple Exports
//module.exports = add;
//Multiple exports
// module.exports = {
//     addFn: add,
//     subFn: sub
// };
//exports using anonousmous function
exports.add = (a , b) => a + b;

exports.sub = (a , b)  => a - b;  
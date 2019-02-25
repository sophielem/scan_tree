import jsfile = require("jsonfile");
import program = require("commander");

program
  .version('0.1.0')
  .option('-i, --input    [chain]', 'Path to the file')
  .parse(process.argv);


interface Node {
  text: string;
  children?: Node[];
}

function isNode(node: any): boolean{
    return node.hasOwnProperty("text") && typeof node.text == 'string';
}
// function work(tree_data: any): [number, number] {
//   // Si pas d'enfants, il s'agit d'une feuille
//   if (!tree_data.hasOwnProperty("children"))
//       return [0, 1];
//   // [Nodes, Leaves]
//   let sum: [number, number] = [1, 0];
//   let rslt: [number, number];
//   // Boucler sur les enfants
//
//
//   for (let child of tree_data.children){
//        rslt = work(child);
//        sum = sum.map((numb, i) => numb + rslt[i]);
//   }
//   return sum;
// }

function work2(tree_data: any): [number, number] {
    if (!isNode(tree_data)){
        console.log("Error: No conform file");
        process.exit()
    }

    // Si pas d'enfants, il s'agit d'une feuille
    if (!tree_data.hasOwnProperty("children"))
        return [0, 1];

    let res:[number, number] = [1, 0]
    tree_data.children.map(work2).forEach((val:number, index:number)=>{
        res[0] += val[0];
        res[1] += val[1];
    });
    return res;
}

jsfile.readFile(program.input)
    .then((tree_data: any) => {
        let count: [number, number] = work2(tree_data);
        console.log("Number of nodes : " + count[0] +"\nNumber of leaves : " + count[1]);
    })
    .catch((e) => {
        console.log("Err " + e);
    });

export default {
	methods: {
        validateOperationNode(node) {
            let operator = "";
            let operation = "";
            switch (node.name) {
                case "add":
                    operator = " + ";
                    operation = "Add";
                break;
                case "sub":
                    operator = " - ";
                    operation = "Sub";
                break;
                case "div":
                    operator = " / ";
                    operation = "Div";
                break;
                case "mul":
                    operator = " * ";
                    operation = "Mul";
                break;
            }
        
            //validar inputs
            let inputs = node.inputs;
            if (inputs.input_1.connections.length !== 1) {
                this.errors.push({
                    error: operation + " node debe tener mas de 1 input conexión",
                    node: node.id,
                });
            } else {
                let nodeInput = this.editor.getNodeFromId(
                    inputs.input_1.connections[0].node
                );
        
                if (nodeInput.name === "number") {
                    this.script += nodeInput.data.num + operator;
                } else {
                    this.errors.push({
                        error: "El nodo " + nodeInput.name + " no es permitido.",
                        node: nodeInput.id
                    });
                }
            }
        
            if (inputs.input_2.connections.length !== 1) {
                this.errors.push({
                    error: operation + " node debe tener mas de 1 input conexión",
                    node: node.id
                });
            } else {
                let nodeInput = this.editor.getNodeFromId(
                    inputs.input_2.connections[0].node
                );
        
                if (nodeInput.name === "number") {
                    this.script += nodeInput.data.num + "\n";
                } else {
                    this.errors.push({
                        error: "El nodo " + nodeInput.name + " no es permitido.",
                        node: node.id,
                    });
                }
            }
        
            let outputs = node.outputs;
            //validar outputs
            if (outputs.output_1.connections.length !== 1) {
                this.errors.push({
                    error: operation + " node debe tener 1 output conexión",
                    node: node.id,
                });
            } else {
                let nodeInput = this.editor.getNodeFromId(
                    outputs.output_1.connections[0].node
                );
        
                if (!(nodeInput.name === "for-body"  ||
                      nodeInput.name === "if-body"   ||
                      nodeInput.name === "else-body" ||
                      nodeInput.name === "assign"    ||
                      nodeInput.name === "root" )) {
                        
                    this.errors.push({
                        error: "El nodo " + nodeInput.name + " no es permitido.",
                        node: node.id
                    });
                }
            }
        },
        validateAssignNode(node, identation){
            this.script += this.returnIdentation(identation) + node.data.assign.trim() + " = ";
            //validar inputs
            let input_connections = node.inputs.input_1.connections.length;
            if (input_connections !== 1) {
              this.errors.push({
                error: "Assign node debe de tener una sola input conexión",
                node: node.id,
              });
            } else {
              let nodeInput = this.editor.getNodeFromId(
                node.inputs.input_1.connections[0].node
              );
              //input_1
              if (
                    nodeInput.name === "add" ||
                    nodeInput.name === "sub" ||
                    nodeInput.name === "div" ||
                    nodeInput.name === "mul"
              ) {
                this.selectValidation(nodeInput,identation);
              } else {
                this.errors.push({
                  error: "El nodo " + nodeInput.name + " no es permitido.",
                  node: nodeInput.id,
                });
              }
            }
        
            let outputs = node.outputs;
            //validar output
            if (outputs.output_1.connections.length !== 1) {
              this.errors.push({
                error: "Assign node debe tener 1 output conexión",
                node: node.id,
              });
            } else {
              let nodeInput = this.editor.getNodeFromId(
                outputs.output_1.connections[0].node
              );
        
              if (!(nodeInput.name === "for-body" ||
                    nodeInput.name === "if-body" ||
                    nodeInput.name === "else-body" ||
                    nodeInput.name === "root" )) {
                      
                  this.errors.push({
                      error: "El nodo " + nodeInput.name + " no es permitido.",
                      node: node.id,
                  });
              }
            }
          },
          validateIfNode(node, identation){
            //validar inputs
            //if condition
            this.script += this.returnIdentation(identation) + "if {condition}:\n";
            let input_connections = node.inputs.input_1.connections.length;
            if (input_connections !== 1) {
              this.errors.push({
                error: "IF node debe de tener un solo if condition.",
                node: node.id
              });
            } else {
              let nodeIfCondition = this.editor.getNodeFromId(
                node.inputs.input_1.connections[0].node
              );
              //input_1
              if (nodeIfCondition.name === "if-condition") {
                this.script = this.script.replace('{condition}', nodeIfCondition.data.con.trim())
              } else {
                this.errors.push({
                  error: "IF node debe de tener un nodo if-condition.",
                  node: node.id
                });
              }
            }
        
            //if body
            input_connections = node.inputs.input_2.connections.length;
            if (input_connections !== 1) {
              this.errors.push({
                error: "IF node debe de tener un solo if body",
                node: node.id
              });
            } else {
              //input_2
              let nodeIfBody = this.editor.getNodeFromId(
                node.inputs.input_2.connections[0].node
              );
              if (nodeIfBody.name === "if-body") {
                let input_connections = nodeIfBody.inputs.input_1.connections.length;
                if (input_connections === 1) {
                  let nodeInput = this.editor.getNodeFromId(
                    nodeIfBody.inputs.input_1.connections[0].node
                  );
                  if (
                    nodeInput.name === "assign" ||
                    nodeInput.name === "for" ||
                    nodeInput.name === "if" ||
                    nodeInput.name === "print"
                  ) {
                    this.selectValidation(nodeInput, identation+1);
                  } else {
                    this.errors.push({
                      error: "El nodo " + nodeInput.name + " no es permitido.",
                      node: nodeIfBody.id
                    });
                  }
                } else {
                  this.errors.push({
                    error: "IF body debe de tener un solo input connection",
                    node: nodeIfBody.id
                  });
                }
              } else {
                this.errors.push({
                  error: "IF node debe de tener un nodo if-body.",
                  node: node.id
                });
              }
            }
        
            //else body
            input_connections = node.inputs.input_3.connections.length;
            if (input_connections > 1) {
              this.errors.push({
                error: "IF node debe de tener un solo else body o ninguno",
                node: node.id
              });
            } else if (input_connections === 1) {
              //input_2
              let nodeElseBody = this.editor.getNodeFromId(
                node.inputs.input_3.connections[0].node
              );
              if (nodeElseBody.name === "else-body") {
                this.script += this.returnIdentation(identation) + "else:\n";
                let input_connections =
                  nodeElseBody.inputs.input_1.connections.length;
                if (input_connections === 1) {
                  let nodeInput = this.editor.getNodeFromId(
                    nodeElseBody.inputs.input_1.connections[0].node
                  );
                  if (
                    nodeInput.name === "assign" ||
                    nodeInput.name === "for" ||
                    nodeInput.name === "if" ||
                    nodeInput.name === "print"
                  ) {
                    console.log("else");
                    this.selectValidation(nodeInput,identation+1);
                  } else {
                    this.errors.push({
                      error: "El nodo " + nodeInput.name + " no es permitido.",
                      node: nodeElseBody.id
                    });
                  }
                } else {
                  this.errors.push({
                    error: "Else body debe de tener un solo input connection",
                    node: nodeElseBody.id
                  });
                }
              } else {
                this.errors.push({
                  error: "IF node debe de tener un nodo else-body.",
                  node: node.id
                });
              }
            }
        
            let outputs = node.outputs;
            //validar outputs
            if (outputs.output_1.connections.length !== 1) {
              this.errors.push({
                error: "If node debe tener 1 output conexión",
                node: node.id
              });
            } else {
              let nodeInput = this.editor.getNodeFromId(
                outputs.output_1.connections[0].node
              );
        
              if (!(nodeInput.name === "root"      ||
                    nodeInput.name === "if-body"   ||
                    nodeInput.name === "else-body" ||
                    nodeInput.name === "for-body")) {
                  this.errors.push({
                      error: "El nodo " + nodeInput.name + " no es permitido.",
                      node: node.id
                  });
              }
            }
          },
          validatePrintNode(node, identation){
            console.log("print");
            this.script += this.returnIdentation(identation) + 'print("' + node.data.msg + '")\n';
        },
        validateForNode(node, identation){
            //validar inputs
            //range
            let input_connections = node.inputs.input_1.connections.length;
            if (input_connections !== 1) {
              this.errors.push({
                error: "For node debe de tener un solo range node.",
                node: node.id
              });
            } else {
              let nodeRange = this.editor.getNodeFromId(
                node.inputs.input_1.connections[0].node
              );
              //input_1
              if (nodeRange.name === "range") {
                let start = 0;
                let end = 0;
                //validar inputs
                let inputs = nodeRange.inputs;
                if (inputs.input_1.connections.length !== 1) {
                  this.errors.push({
                    error: "Range node debe tener solo 1 input conexión",
                    node: nodeRange.id
                  });
                } else {
                  let nodeInput = this.editor.getNodeFromId(
                    inputs.input_1.connections[0].node
                  );
                  if (nodeInput.name === "number") {
                    start = nodeInput.data.num;
                  } else {
                    this.errors.push({
                      error: "El nodo " + nodeInput.name + " no es permitido.",
                      node: nodeInput.id
                    });
                  }
                }
        
                if (inputs.input_2.connections.length !== 1) {
                  this.errors.push({
                    error: "Range node debe tener solo 1 input conexión",
                    node: nodeRange.id
                  });
                } else {
                  let nodeInput = this.editor.getNodeFromId(
                    inputs.input_2.connections[0].node
                  );
                  if (nodeInput.name === "number") {
                    end = nodeInput.data.num;
                  } else {
                    this.errors.push({
                      error: "El nodo " + nodeInput.name + " no es permitido.",
                      node: nodeInput.id
                    });
                  }
                }
                this.script += this.returnIdentation(identation) + "for i in range(" + start + "," + end + "):\n";
              } else {
                this.errors.push({
                  error: "Range node debe de tener un nodo range.",
                  node: node.id
                });
              }
            }
        
            //for body
            input_connections = node.inputs.input_2.connections.length;
            if (input_connections !== 1) {
              this.errors.push({
                error: "For node debe de tener un solo for body",
                node: node.id
              });
            } else {
              //input_2
              let nodeForBody = this.editor.getNodeFromId(
                node.inputs.input_2.connections[0].node
              );
              if (nodeForBody.name === "for-body") {
                let input_connections = nodeForBody.inputs.input_1.connections.length;
                if (input_connections === 1) {
                  let nodeInput = this.editor.getNodeFromId(
                    nodeForBody.inputs.input_1.connections[0].node
                  );
                  if (
                    nodeInput.name === "assign" ||
                    nodeInput.name === "for" ||
                    nodeInput.name === "if" ||
                    nodeInput.name === "print"
                  ) {
                    this.selectValidation(nodeInput, identation+1);
                  } else {
                    this.errors.push({
                      error: "El nodo " + nodeInput.name + " no es permitido.",
                      node: nodeForBody.id
                    });
                  }
                } else {
                  this.errors.push({
                    error: "For body debe de tener un solo input connection",
                    node: nodeForBody.id
                  });
                }
              } else {
                this.errors.push({
                  error: "For node debe de tener un nodo for-body.",
                  node: node.id
                });
              }
            }
        
            let outputs = node.outputs;
            //validar outputs
            if (outputs.output_1.connections.length !== 1) {
              this.errors.push({
                error: "For node debe tener 1 output conexión",
                node: node.id
              });
            } else {
              let nodeInput = this.editor.getNodeFromId(
                outputs.output_1.connections[0].node
              );
        
              if (!(nodeInput.name === "root"      ||
                    nodeInput.name === "if-body"   ||
                    nodeInput.name === "else-body" ||
                    nodeInput.name === "for-body")) {
                  this.errors.push({
                      error: "El nodo " + nodeInput.name + " no es permitido.",
                      node: node.id
                  });
              }
            }
          },
          validateRoot() {
            const rootNode = JSON.parse(
              JSON.stringify(this.editor.drawflow.drawflow.Home.data)
            )[this.rootNodeId];
            this.script = "";
            this.errors = [];
            if (rootNode !== undefined) {
              let connections = rootNode.inputs.input_1.connections;
              connections.forEach((connection) => {
                let node = this.editor.getNodeFromId(connection.node);
                this.selectValidation(node, 0);
              });
            } else {
              this.errors.push({ error: "Debe agregar un root  node", node: 1 });
            }
          },
          selectValidation(node, identation){
            switch (node.name) {
            case "if":
                this.validateIfNode(node, identation);
                break;
            case "assign":
                this.validateAssignNode(node, identation);
                break;
            case "add":
                this.validateOperationNode(node);
                break;
            case "sub":
                this.validateOperationNode(node);
                break;
            case "mul":
                this.validateOperationNode(node);
                break;
            case "div":
                this.validateOperationNode(node);
                break;
            case "for":
                this.validateForNode(node, identation);
                break;
            case "print":
                this.validatePrintNode(node, identation);
                break;
            default:
                break;
            }
        },
        returnIdentation(n){
            let spaces = ''
            for (let index = 0; index < n; index++) {
                spaces += ' '
            }
            return spaces
        }
    }
}
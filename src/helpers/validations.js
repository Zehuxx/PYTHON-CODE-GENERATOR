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
                let connections = inputs.input_1.connections.length
                if(connections == 0){
                  this.errors.push({
                    error: "[input_1] requires 1 connection.",
                    node: node.id,
                   });
                }else{
                  this.errors.push({
                    error: "[input_1] only one connection is allowed.",
                    node: node.id,
                  });
                }
            } else {
                let nodeInput = this.editor.getNodeFromId(
                    inputs.input_1.connections[0].node
                );
        
                if (nodeInput.name === "number") {
                    this.script += nodeInput.data.num + operator;
                } else {
                    this.errors.push({
                        error: "[input_1] the " + nodeInput.name + " node is not allowed.",
                        node: node.id
                    });
                }
            }
        
            if (inputs.input_2.connections.length !== 1) {
                  this.errors.push({
                    error: "[input_2] requires only 1 connection.",
                    node: node.id,
                   });
            } else {
                let nodeInput = this.editor.getNodeFromId(
                    inputs.input_2.connections[0].node
                );
        
                if (nodeInput.name === "number") {
                    this.script += nodeInput.data.num + "\n";
                } else {
                    this.errors.push({
                        error: "[input_2] the " + nodeInput.name + " node is not allowed.",
                        node: node.id,
                    });
                }
            }
        
            let outputs = node.outputs;
            //validar outputs
            if (outputs.output_1.connections.length !== 1) {
                this.errors.push({
                    error: "[output_1] requires only 1 connection.",
                    node: node.id,
                });
            } else {
                let nodeInput = this.editor.getNodeFromId(
                    outputs.output_1.connections[0].node
                );
        
                if (!(nodeInput.name === "assign")) {
                    this.errors.push({
                        error: "[output_1] the " + nodeInput.name + " node is not allowed.",
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
                error: "[input_1] requires only 1 connection.",
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
                  error: "[input_1] the " + nodeInput.name + " node is not allowed.",
                  node: node.id,
                });
              }
            }
        
            let outputs = node.outputs;
            //validar output
            if (outputs.output_1.connections.length !== 1) {
              this.errors.push({
                error: "[output_1] requires only 1 connection.",
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
                      error: "[output_1] the " + nodeInput.name + " node is not allowed.",
                      node: node.id,
                  });
              }
            }
          },
          validateIfNode(node, identation){
            this.script += this.returnIdentation(identation) + "if {condition}:\n";
            //if condition input
            let input_connections = node.inputs.input_1.connections.length;
            if (input_connections !== 1) {
              this.errors.push({
                error: "[input_1] requires only 1 connection to a node [IF CONDITION].",
                node: node.id
              });
            } else {
              let nodeInput = this.editor.getNodeFromId(
                node.inputs.input_1.connections[0].node
              );
              if (nodeInput.name === "if-condition") {
                //if condition output
                let output_connections = nodeInput.outputs.output_1.connections.length;
                if (output_connections !== 1) {
                  this.errors.push({
                    error: "[output_1] requires only 1 connection to a node [IF].",
                    node: nodeInput.id
                  });
                } else {
                  let nodeOutput = this.editor.getNodeFromId(
                    nodeInput.outputs.output_1.connections[0].node
                  );
                  if (!(nodeOutput.name === "if")) {
                    this.errors.push({
                      error: "[output_1] the " + nodeOutput.name + " node is not allowed.",
                      node: nodeInput.id
                    });
                  }
                }

                this.script = this.script.replace('{condition}', nodeInput.data.con.trim())
              } else {
                this.errors.push({
                  error: "[input_1] the " + nodeInput.name + " node is not allowed.",
                  node: node.id
                });
              }
            }

            //if body inputs
            input_connections = node.inputs.input_2.connections.length;
            if (input_connections !== 1) {
              this.errors.push({
                error: "[input_2] requires only 1 connection to a node [IF BODY].",
                node: node.id
              });
            } else {
              //input_2
              let nodeIfBody = this.editor.getNodeFromId(
                node.inputs.input_2.connections[0].node
              );
              if (nodeIfBody.name === "if-body") {
                //INPUTS
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
                      error: "[input_1] the " + nodeInput.name + " node is not allowed.",
                      node: nodeIfBody.id
                    });
                  }
                } else {
                  this.errors.push({
                    error: "[input_1] requires only 1 connection.",
                    node: nodeIfBody.id
                  });
                }

                //OUTPUTS
                let output_connections = nodeIfBody.outputs.output_1.connections.length;
                if (output_connections !== 1) {
                  this.errors.push({
                    error: "[output_1] requires only 1 connection to a node [IF].",
                    node: nodeIfBody.id
                  });
                } else {
                  let nodeOutput = this.editor.getNodeFromId(
                    nodeIfBody.outputs.output_1.connections[0].node
                  );
                  if (!(nodeOutput.name === "if")) {
                    this.errors.push({
                      error: "[output_1] the " + nodeOutput.name + " node is not allowed.",
                      node: nodeIfBody.id
                    });
                  }
                }
              } else {
                this.errors.push({
                  error: "[input_2] the " + nodeIfBody.name + " node is not allowed.",
                  node: node.id
                });
              }
            }
        
            //else body input
            input_connections = node.inputs.input_3.connections.length;
            if (input_connections > 1) {
              this.errors.push({
                error: "[input_3] does not require a connection but if it is included only 1 connection is allowed with a node [ElSE BODY].",
                node: node.id
              });
            } else if (input_connections === 1) {
              //input_2
              let nodeElseBody = this.editor.getNodeFromId(
                node.inputs.input_3.connections[0].node
              );
              if (nodeElseBody.name === "else-body") {
                this.script += this.returnIdentation(identation) + "else:\n";
                //INPUTS
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
                    this.selectValidation(nodeInput,identation+1);
                  } else {
                    this.errors.push({
                      error: "[input_1] the " + nodeInput.name + " node is not allowed.",
                      node: nodeElseBody.id
                    });
                  }
                } else {
                  this.errors.push({
                    error: "[input_1] requires only 1 connection.",
                    node: nodeElseBody.id
                  });
                }

                //OUTPUTS
                let output_connections = nodeElseBody.outputs.output_1.connections.length;
                if (output_connections !== 1) {
                  this.errors.push({
                    error: "[output_1] requires only 1 connection to a node [IF].",
                    node: nodeElseBody.id
                  });
                } else {
                  let nodeOutput = this.editor.getNodeFromId(
                    nodeElseBody.outputs.output_1.connections[0].node
                  );
                  if (!(nodeOutput.name === "if")) {
                    this.errors.push({
                      error: "[output_1] the " + nodeOutput.name + " node is not allowed.",
                      node: nodeElseBody.id
                    });
                  }
                }

              } else {
                this.errors.push({
                  error: "[input_3] the " + nodeElseBody.name + " node is not allowed.",
                  node: node.id
                });
              }
            }
            
            //if output
            let outputs = node.outputs;
            //validar outputs
            if (outputs.output_1.connections.length !== 1) {
              this.errors.push({
                error: "[output_1] requires only 1 connection.",
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
                      error: "[output_1] the " + nodeInput.name + " node is not allowed.",
                      node: node.id
                  });
              }
            }
          },
          validatePrintNode(node, identation){
            let output_connections = node.outputs.output_1.connections.length;
            if (output_connections !== 1) {
              this.errors.push({
                error: "[output_1] requires only 1 connection.",
                node: node.id
              });
            } else {
              let nodeInput = this.editor.getNodeFromId(
                node.outputs.output_1.connections[0].node
              );
              //output_1
              if (nodeInput.name === "if-body" || 
                  nodeInput.name === "else-body" ||
                  nodeInput.name === "for-body" ||
                  nodeInput.name === "root") {
                    let c= node.data.msg
                    if(c.substring(0,1) == "{" && c.substring(c.length - 1) == "}"){
                      this.script += this.returnIdentation(identation) + `print(${c.substring(1,c.length-1)})\n`;
                    }else{
                      this.script += this.returnIdentation(identation) + "print('"+c+"')\n";
                    }
              } else {
                this.errors.push({
                  error: "[output_1] the " + nodeInput.name + " node is not allowed.",
                  node: node.id
                });
              }
            }
        },
        validateForNode(node, identation){
            //validar inputs
            //range
            let input_connections = node.inputs.input_1.connections.length;
            if (input_connections !== 1) {
              this.errors.push({
                error: "[input_1] requires only 1 connection to a node [RANGE].",
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
                //INPUTS
                let inputs = nodeRange.inputs;
                if (inputs.input_1.connections.length !== 1) {
                  this.errors.push({
                    error: "[input_1] requires only 1 connection to a node [NUMBER].",
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
                      error: "[input_1] the " + nodeInput.name + " node is not allowed.",
                      node: nodeInput.id
                    });
                  }
                }
        
                if (inputs.input_2.connections.length !== 1) {
                  this.errors.push({
                    error: "[input_2] requires only 1 connection to a node [NUMBER].",
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
                      error: "[input_2] the " + nodeInput.name + " node is not allowed.",
                      node: nodeInput.id
                    });
                  }
                }
                //OUTPUTS
                let outputs = nodeRange.outputs;
                if (outputs.output_1.connections.length !== 1) {
                  this.errors.push({
                    error: "[output_1] requires only 1 connection to a node [FOR].",
                    node: nodeRange.id
                  });
                } else {
                  let nodeInput = this.editor.getNodeFromId(
                    outputs.output_1.connections[0].node
                  );
                  if (!(nodeInput.name === "for")) {
                    this.errors.push({
                      error: "[output_1] the " + nodeInput.name + " node is not allowed.",
                      node: nodeRange.id
                    });
                  }
                }

                this.script += this.returnIdentation(identation) + "for i in range(" + start + "," + end + "):\n";
              } else {
                this.errors.push({
                  error: "[input_1] the " + nodeRange.name + " node is not allowed.",
                  node: node.id
                });
              }
            }
        
            //for body
            input_connections = node.inputs.input_2.connections.length;
            if (input_connections !== 1) {
              this.errors.push({
                error: "[input_2] requires only 1 connection to a node [FOR BODY].",
                node: node.id
              });
            } else {
              //input_2
              let nodeForBody = this.editor.getNodeFromId(
                node.inputs.input_2.connections[0].node
              );
              if (nodeForBody.name === "for-body") {
                //INPUTS
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
                      error: "[input_1] the " + nodeInput.name + " node is not allowed.",
                      node: nodeForBody.id
                    });
                  }
                } else {
                  this.errors.push({
                    error: "[input_1] requires only 1 connection.",
                    node: nodeForBody.id
                  });
                }
                //OUTPUTS
                let output_connections = nodeForBody.outputs.output_1.connections.length;
                if (output_connections === 1) {
                  let nodeInput = this.editor.getNodeFromId(
                    nodeForBody.outputs.output_1.connections[0].node
                  );
                  if (!(nodeInput.name === "for")) {
                    this.errors.push({
                      error: "[output_1] the " + nodeInput.name + " node is not allowed.",
                      node: nodeForBody.id
                    });
                  }
                } else {
                  this.errors.push({
                    error: "[output_1] requires only 1 connection to a node [FOR].",
                    node: nodeForBody.id
                  });
                }

              } else {
                this.errors.push({
                  error: "[input_2] the " + nodeForBody.name + " node is not allowed.",
                  node: node.id
                });
              }
            }
        
            let outputs = node.outputs;
            //validar outputs
            if (outputs.output_1.connections.length !== 1) {
              this.errors.push({
                error: "[output_1] requires only 1 connection.",
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
                      error: "[output_1] the " + nodeInput.name + " node is not allowed.",
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
              this.showError('You must add a root node.', "error")
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
export default {
	methods: {
		createAddNode(pos_x, pos_y) {
			var html = `<div class="container">
							<div class="item">
								<strong><input type="text" style="width:100%;" disabled df-nid></strong>
							</div>
							<div class="item">Number</div>
							<div class="item">
								<input type="text" style="width:100%;background-color: white !important;" df-num>
							</div>
						</div>`;
			var html2 = `<div class="container">
							<div class="item">
								<strong><input type="text" style="width:100%;" disabled df-nid></strong>
							</div>
							<div class="item">Add</div>
							<div class="item">
								<input type="text" style="width:100%;background-color: white !important;" df-num>
							</div>
						</div>`;

			let id1 = this.editor.addNode(
				"number",
				0,
				1,
				pos_x - 200,
				pos_y - 80,
				"node-number",
				{},
				html
			);
			this.editor.updateNodeDataFromId(id1,{nid:"Node id: "+id1,num: "0"})

			let id2 = this.editor.addNode(
				"number",
				0,
				1,
				pos_x - 200,
				pos_y + 80,
				"node-number",
				{},
				html
			);
			this.editor.updateNodeDataFromId(id2,{nid:"Node id: "+id2,num: "0"})

			let id3 = this.editor.addNode(
				"add",
				2,
				1,
				pos_x,
				pos_y,
				"node-add",
				{},
				html2
			);
			this.editor.updateNodeDataFromId(id3,{nid:"Node id: "+id3,num: "0"})

			//addConnection(id_output, id_input, output_class, input_class)
			this.editor.addConnection(id1, id3, "output_1", "input_1");
			this.editor.addConnection(id2, id3, "output_1", "input_2");
		},
		createSubNode(pos_x, pos_y) {
			var html = `<div class="container">
							<div class="item">
								<strong><input type="text" style="width:100%;" disabled df-nid></strong>
							</div>
							<div class="item">Number</div>
							<div class="item">
								<input type="text" style="width:100%;background-color: white !important;" df-num>
							</div>
						</div>`;
			var html2 = `<div class="container">
							<div class="item">
								<strong><input type="text" style="width:100%;" disabled df-nid></strong>
							</div>
							<div class="item">Sub</div>
							<div class="item">
								<input type="text" style="width:100%;background-color: white !important;" df-num>
							</div>
						</div>`;

			//this.editor.addNode(name, inputs, outputs, posx, posy, class, data, html);
			let id1 = this.editor.addNode(
				"number",
				0,
				1,
				pos_x - 200,
				pos_y - 80,
				"node-number",
				{},
				html
			);
			this.editor.updateNodeDataFromId(id1,{nid:"Node id: "+id1,num: "0"})

			let id2 = this.editor.addNode(
				"number",
				0,
				1,
				pos_x - 200,
				pos_y + 80,
				"node-number",
				{},
				html
			);
			this.editor.updateNodeDataFromId(id2,{nid:"Node id: "+id2,num: "0"})

			let id3 = this.editor.addNode(
				"sub",
				2,
				1,
				pos_x,
				pos_y,
				"node-sub",
				{},
				html2
			);
			this.editor.updateNodeDataFromId(id3,{nid:"Node id: "+id3,num: "0"})

			//addConnection(id_output, id_input, output_class, input_class)
			this.editor.addConnection(id1, id3, "output_1", "input_1");
			this.editor.addConnection(id2, id3, "output_1", "input_2");
		},
		createDivNode(pos_x, pos_y) {
			var html = `<div class="container">
							<div class="item">
								<strong><input type="text" style="width:100%;" disabled df-nid></strong>
							</div>
							<div class="item">Number</div>
							<div class="item">
								<input type="text" style="width:100%;background-color: white !important;" df-num>
							</div>
						</div>`;
			var html2 = `<div class="container">
							<div class="item">
								<strong><input type="text" style="width:100%;" disabled df-nid></strong>
							</div>
							<div class="item">Div</div>
							<div class="item">
								<input type="text" style="width:100%;background-color: white !important;" df-num>
							</div>
						</div>`;

			//this.editor.addNode(name, inputs, outputs, posx, posy, class, data, html);
			let id1 = this.editor.addNode(
				"number",
				0,
				1,
				pos_x - 200,
				pos_y - 80,
				"node-number",
				{},
				html
			);
			this.editor.updateNodeDataFromId(id1,{nid:"Node id: "+id1,num: "0"})

			let id2 = this.editor.addNode(
				"number",
				0,
				1,
				pos_x - 200,
				pos_y + 80,
				"node-number",
				{},
				html
			);
			this.editor.updateNodeDataFromId(id2,{nid:"Node id: "+id2,num: "0"})

			let id3 = this.editor.addNode(
				"div",
				2,
				1,
				pos_x,
				pos_y,
				"node-div",
				{},
				html2
			);
			this.editor.updateNodeDataFromId(id3,{nid:"Node id: "+id3,num: "0"})

			//addConnection(id_output, id_input, output_class, input_class)
			this.editor.addConnection(id1, id3, "output_1", "input_1");
			this.editor.addConnection(id2, id3, "output_1", "input_2");
		},
		createMulNode(pos_x, pos_y) {
			var html = `<div class="container">
							<div class="item">
								<strong><input type="text" style="width:100%;" disabled df-nid></strong>
							</div>
							<div class="item">Number</div>
							<div class="item">
								<input type="text" style="width:100%;background-color: white !important;" df-num>
							</div>
						</div>`;
			var html2 = `<div class="container">
							<div class="item">
								<strong><input type="text" style="width:100%;" disabled df-nid></strong>
							</div>
							<div class="item">Mul</div>
							<div class="item">
								<input type="text" style="width:100%;background-color: white !important;" df-num>
							</div>
						</div>`;

			//this.editor.addNode(name, inputs, outputs, posx, posy, class, data, html);
			let id1 = this.editor.addNode(
				"number",
				0,
				1,
				pos_x - 200,
				pos_y - 80,
				"node-number",
				{},
				html
			);
			this.editor.updateNodeDataFromId(id1,{nid:"Node id: "+id1,num: "0"})

			let id2 = this.editor.addNode(
				"number",
				0,
				1,
				pos_x - 200,
				pos_y + 80,
				"node-number",
				{},
				html
			);
			this.editor.updateNodeDataFromId(id2,{nid:"Node id: "+id2,num: "0"})

			let id3 = this.editor.addNode(
				"mul",
				2,
				1,
				pos_x,
				pos_y,
				"node-mul",
				{},
				html2
			);
			this.editor.updateNodeDataFromId(id3,{nid:"Node id: "+id3,num: "0"})

			//addConnection(id_output, id_input, output_class, input_class)
			this.editor.addConnection(id1, id3, "output_1", "input_1");
			this.editor.addConnection(id2, id3, "output_1", "input_2");
		},
		createIfNode(pos_x, pos_y) {
			var html = `<div class="container">
							<div class="item">
								<strong><input type="text" style="width:100%;" disabled df-nid></strong>
							</div>
							<div class="item">If</div>
						</div>`;

			var html2 = `<div class="container">
							<div class="item">
								<strong><input type="text" style="width:100%;" disabled df-nid></strong>
							</div>
							<div class="item">If condition</div>
							<div class="item">
								<input type="text" style="width:100%;background-color: white !important;" df-con>
							</div>
						</div>`;

			var html3 = `<div class="container">
							<div class="item">
								<strong><input type="text" style="width:100%;" disabled df-nid></strong>
							</div>
							<div class="item">If body</div>
						</div>`;

			var html4 = `<div class="container">
							<div class="item">
								<strong><input type="text" style="width:100%;" disabled df-nid></strong>
							</div>
							<div class="item">Else body</div>
						</div>`;

			//this.editor.addNode(name, inputs, outputs, posx, posy, class, data, html);
			let id1 = this.editor.addNode(
				"if",
				3,
				1,
				pos_x,
				pos_y,
				"node-if",
				{},
				html
			);
			this.editor.updateNodeDataFromId(id1,{nid:"Node id: "+id1})

			let id2 = this.editor.addNode(
				"if-condition",
				0,
				1,
				pos_x - 200,
				pos_y - 160,
				"node-if-condition",
				{},
				html2
			);
			this.editor.updateNodeDataFromId(id2,{nid:"Node id: "+id2, con:""})

			let id3 = this.editor.addNode(
				"if-body",
				1,
				1,
				pos_x - 200,
				pos_y,
				"node-if-body",
				{},
				html3
			);
			this.editor.updateNodeDataFromId(id3,{nid:"Node id: "+id3})

			let id4 = this.editor.addNode(
				"else-body",
				1,
				1,
				pos_x - 200,
				pos_y + 130,
				"node-else-body",
				{},
				html4
			);
			this.editor.updateNodeDataFromId(id4,{nid:"Node id: "+id4})

			//addConnection(id_output, id_input, output_class, input_class)
			//this.editor.addConnection(2, 1, "output_1", "input_1");
			this.editor.addConnection(id2, id1, "output_1", "input_1");
			this.editor.addConnection(id3, id1, "output_1", "input_2");
			this.editor.addConnection(id4, id1, "output_1", "input_3");
		},
		createForNode(pos_x, pos_y) {
			var html = `<div class="container">
							<div class="item">
								<strong><input type="text" style="width:100%;" disabled df-nid></strong>
							</div>
							<div class="item">For</div>
						</div>`;

			var html2 = `<div class="container">
							<div class="item">
								<strong><input type="text" style="width:100%;" disabled df-nid></strong>
							</div>
							<div class="item">Range</div>
						</div>`;

			var html3 = `<div class="container">
							<div class="item">
								<strong><input type="text" style="width:100%;" disabled df-nid></strong>
							</div>
							<div class="item">Number</div>
							<div class="item">
								<input type="text" style="width:100%;background-color: white !important;" df-num>
							</div>
						</div>`;

			var html4 = `<div class="container">
							<div class="item">
								<strong><input type="text" style="width:100%;" disabled df-nid></strong>
							</div>
							<div class="item">Number</div>
							<div class="item">
								<input type="text" style="width:100%;background-color: white !important;" df-num>
							</div>
						</div>`;

			var html5 = `<div class="container">
							<div class="item">
								<strong><input type="text" style="width:100%;" disabled df-nid></strong>
							</div>
							<div class="item">For body</div>
						</div>`;


			//this.editor.addNode(name, inputs, outputs, posx, posy, class, data, html);
			let id1 = this.editor.addNode(
				"for",
				2,
				1,
				pos_x,
				pos_y,
				"node-for",
				{},
				html
			);
			this.editor.updateNodeDataFromId(id1,{nid:"Node id: "+id1})

			let id2 = this.editor.addNode(
				"range",
				2,
				1,
				pos_x - 200,
				pos_y - 70,
				"node-range",
				{},
				html2
			);
			this.editor.updateNodeDataFromId(id2,{nid:"Node id: "+id2})

			let id3 = this.editor.addNode(
				"number",
				0,
				1,
				pos_x - 400,
				pos_y - 150,
				"node-number",
				{},
				html3
			);
			this.editor.updateNodeDataFromId(id3,{nid:"Node id: "+id3, num:"0"})

			let id4 = this.editor.addNode(
				"number",
				0,
				1,
				pos_x - 400,
				pos_y + 10,
				"node-number",
				{},
				html4
			);
			this.editor.updateNodeDataFromId(id4,{nid:"Node id: "+id4, num:"1"})

			let id5 = this.editor.addNode(
				"for-body",
				1,
				1,
				pos_x - 200,
				pos_y + 70,
				"node-for-body",
				{},
				html5
			);
			this.editor.updateNodeDataFromId(id5,{nid:"Node id: "+id5})

			//addConnection(id_output, id_input, output_class, input_class)
			this.editor.addConnection(id2, id1, "output_1", "input_1");
			this.editor.addConnection(id5, id1, "output_1", "input_2");
			this.editor.addConnection(id3, id2, "output_1", "input_1");
			this.editor.addConnection(id4, id2, "output_1", "input_2");
		},
		createPrintNode(pos_x, pos_y) {
			var html = `<div class="container">
							<div class="item">
								<strong><input type="text" style="width:100%;" disabled df-nid></strong>
							</div>
							<div class="item">Print</div>
							<div class="item">
								<input type="text" style="width:100%;background-color: white !important;" df-msg>
							</div>
						</div>`;
			//this.editor.addNode(name, inputs, outputs, posx, posy, class, data, html);
			let id1 = this.editor.addNode(
				"print",
				0,
				1,
				pos_x,
				pos_y,
				"node-print",
				{},
				html
			);
			this.editor.updateNodeDataFromId(id1,{nid:"Node id: "+id1, msg:"Hola"})
		},
		createAssignNode(pos_x, pos_y) {
			var html = `<div class="container">
							<div class="item">
								<strong><input type="text" style="width:100%;" disabled df-nid></strong>
							</div>
							<div class="item">Assign</div>
							<div class="item">
								<input type="text" style="width:100%;background-color: white !important;" df-assign>
							</div>
						</div>`;

			//this.editor.addNode(name, inputs, outputs, posx, posy, class, data, html);
			let id1 = this.editor.addNode(
				"assign",
				1,
				1,
				pos_x,
				pos_y,
				"node-assign",
				{},
				html
			);
			this.editor.updateNodeDataFromId(id1,{nid:"Node id: "+id1, assign:""})
		},
		createRootNode() {
			const rootNode = JSON.parse(
				JSON.stringify(this.editor.drawflow.drawflow.Home.data)
			)[this.rootNodeId];
			if (rootNode === undefined) {
				var html = `<div class="container">
								<div class="item">
									<strong><input type="text" style="width:100%;" disabled df-nid></strong>
								</div>
								<div class="item">Root</div>
							</div>`;
				let pos_x = (this.editor.precanvas.clientWidth * 3) / 4;
				let pos_y = this.editor.precanvas.clientHeight / 2;
				//editor.addNode(name, inputs, outputs, posx, posy, class, data, html);
				let id1 = this.editor.addNode(
					"root",
					1,
					0,
					pos_x,
					pos_y,
					"node-root",
					{},
					html
				);
				this.editor.updateNodeDataFromId(id1,{nid:"Node id: "+id1})
				this.rootNodeId = id1;
			} else {
				this.errors.push({ error: "Ya existe un root node", node: this.rootNodeId });
			}
		},
		addNodeToDrawFlow(name, pos_x, pos_y) {
			switch (name) {
				case "for":
					this.createForNode(pos_x, pos_y);
					break;
				case "if":
					this.createIfNode(pos_x, pos_y);
					break;
				case "assign":
					this.createAssignNode(pos_x, pos_y);
					break;
				case "add":
					this.createAddNode(pos_x, pos_y);
					break;
				case "sub":
					this.createSubNode(pos_x, pos_y);
					break;
				case "mul":
					this.createMulNode(pos_x, pos_y);
					break;
				case "div":
					this.createDivNode(pos_x, pos_y);
					break;
				case "root":
					this.createRootNode();
					break;
				case "print":
					this.createPrintNode(pos_x, pos_y);
					break;
				default:
					break;
			}
		}
	}
}


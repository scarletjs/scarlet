requirejs.config({
	baseUrl: "javascripts",
	paths: {
		"jquery": "vendor/jquery",
		"jquery.gridify": "vendor/gridify",
		"jquery.jqgrid": "vendor/jqgrid/js/jquery.jqGrid.min",
		"stringformat": "vendor/string-format"
	},
	shim: {
	    "jquery.gridify": {
	        deps: [ "jquery" ],
	        exports: "jQuery.fn.gridify"
	    },
	    "jquery.jqgrid": {
	    	deps: ["jquery"],
	    	exports: "jQuery.fn.jqGrid"
	    }
	}
});

require([
		"jquery",
		"jquery.gridify",
		"jquery.jqgrid",
		"stringformat",
		"library/style",
		"library/header",
		"library/navigation",
		"library/content",
		"library/footer",
		"library/panel",
		"library/tile"
	],
	function($, gf, jqg, sf, Style, Header, Navigation, Content, Footer, Panel, Tile) {

		var style = new Style();
		
		var header = new Header("#header", style);
		header.animate();
		
		var navigation = new Navigation("#navigation", style);
		navigation.animate();

		var content = new Content("#content", style);
		content.animate();

		var footer = new Footer("#footer", style);
		footer.animate();

		// var tile1 = new Tile("#tileContainer", style);
		// tile1.initialise(2,2);
		// tile1.animate(2,2, "#tileTemplate");

		// var tile2 = new Tile("#tileContainer", style);
		// tile2.animate(2,2, "#tileTemplate");
		
		// var tile3 = new Tile("#tileContainer", style);
		// tile3.animate(2,2, "#tileTemplate");
		
		// var tile4 = new Tile("#tileContainer", style);
		// tile4.animate(2,2, "#tileTemplate");


//		console.log("Before jquery grid thingy");

		// $("#list").jqGrid({
	 //        url: "/content/jsgrid-sample.xml",
	 //        datatype: "xml",
	 //        mtype: "GET",
	 //        colNames: ["Inv No", "Date", "Amount", "Tax", "Total", "Notes"],
	 //        colModel: [
	 //            { name: "invid", width: 55 },
	 //            { name: "invdate", width: 90 },
	 //            { name: "amount", width: 80, align: "right" },
	 //            { name: "tax", width: 80, align: "right" },
	 //            { name: "total", width: 80, align: "right" },
	 //            { name: "note", width: 150, sortable: false }
	 //        ],
	 //        pager: "#pager",
	 //        rowNum: 10,
	 //        rowList: [10, 20, 30],
	 //        sortname: "invid",
	 //        sortorder: "desc",
	 //        viewrecords: true,
	 //        gridview: true,
	 //        autoencode: true,
	 //        caption: "My first grid"
	 //    }); 

//	    console.log("After jquery grid thingy");

	});


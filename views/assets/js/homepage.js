var pageAssemble = function(contentArray) {
	var rowAssembler = function(element) {
		var contentTable = $('#main-content');
		switch(element.type) {
			case 'instagram':
			contentTable.append('<tr><td class="col-md-8 col-md-offset-2" ><img src="' + element.imageSource +
				'" class="img-responsive " alt="Responsive image"></td></tr>');
			break;
			case 'tweet':

			break;

			case 'facebook post':

			break;

		}
	};

	contentArray.forEach(rowAssembler);
};
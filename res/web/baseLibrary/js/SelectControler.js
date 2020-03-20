var selectList = null;
class SelectControler {
	constructor(arg) {
		selectList = arg;
		for (let i = 0; i < selectList.length; i++) {
			$(selectList[i][0]).selectMania({
				size: 'small',
				themes: ['blue'], 
				placeholder: selectList[i][1],
				empty: true,
				removable: true,
				search: selectList[i][0]!='.Sex',
			});
		}
	}
	refresh(){
		for (let i = 0; i < selectList.length; i++) {
			$(selectList[i][0]).selectMania('update').selectMania('clear');
			if(selectList[i][0]==='.direction'){
				let icon = $(selectList[i][0]).prev().find('.select-mania-item-icon i');
				for (let i = 0; i < icon.length; i++) {
					let html = icon[i].outerHTML;
					html = html.replace(/^<i/,"<div");
					html = html.replace(/\/i>$/,"/div>");
					$(icon[i]).replaceWith(html);
				}
			}
		}
		return this;
	}
	appendOption($select,dictObjList){
		for (let i = 0; i < dictObjList.length; i++) {
			let dictObj = dictObjList[i];
			if(dictObj.ico) $select.append('<option data-icon="'+dictObj.ico+'" value="'+dictObj.value+'">'+dictObj.text+'</option>');
			else $select.append('<option value="'+dictObj.value+'">'+dictObj.text+'</option>');
		}
		this.refresh();
	}
	appendOptGroup($select,grpName){
		$select.append('<optgroup label="'+grpName+'"></optgroup>');
		this.refresh();
	}
}
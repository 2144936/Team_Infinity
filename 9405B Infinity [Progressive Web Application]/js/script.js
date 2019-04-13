
function getSearch(){
	var q = "How to cook"+$('#searchBox').val()+"";
	
	$('#relatedVideo').empty();
	$.get(
			"https://www.googleapis.com/youtube/v3/search",{
				part: 'snippet',
				maxResults:6,
				q:q,
				type: 'video',
				key: 'AIzaSyD9SRVgTdcC5lqNIvhRcvu7SVCA2hYy6cc'},
				function(data){
					var output;
					$.each(data.items, function(i, item){
						console.log(item);
						videoTitle = item.snippet.title;
						videoId = item.id.videoId;

						output = '<iframe src=\"//www.youtube.com/embed/'+videoId+'\" allowfullscreen width="265" height="265"></iframe><p style="background-color: white; padding: 10px;">'+videoTitle+'</p>';

						$('#relatedVideo').append(output);
						
					})
				}
		);


	
		
		
};

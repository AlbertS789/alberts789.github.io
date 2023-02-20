// Original file from: https://github.com/chienhsiang-hung/embed-medium-blog-on-website/blob/main/asset/js/EmbeddingMedium.js
// Post: https://hungchienhsiang.medium.com/embed-medium-blog-on-website-880dc0d75062

$(function () {
    var mediumPromise = new Promise(function (resolve) {
        var $content = $('#jsonContent');
        var data = {rss: 'https://medium.com/feed/acquisition-of-learning'};    // @Al123'};

        // use http://jsonviewer.stack.hu/ to check json file easier
        $.get(
	     'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Facuity-learning',
            //'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Facquisition-of-learning',
            //'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40Al123',
            data,
            function (response) {
                if (response.status == 'ok') {
                    var display = '';
                    $.each(
                        response.items,
                        function (k, item) {
                            // get the descrption
                            doc = new DOMParser().parseFromString(item.description, 'text/html');
                            p_value = doc.querySelector('p').textContent;

                            //console.log(item);
                            //console.log(p_value);

                            display += `<div class="card medium-card col-four tab-full" >`;
                            var src = item["thumbnail"]; // use thumbnail url
                            display += `  <span>
                                            <img src="${src}" class="card-img-top" alt="Cover image">
                                          </span>`;
                            display += `  <div class="card-body row">`;
                            display += `    <div class="col-twelve" style="max-height:30%">`;
                            display += `        <h5 class="card-title">${item.title}</h5>`;
                            display += `        <p>${item.pubDate}</p>`;
                            display += `    </div>`;
                            
                            // add categories
                            display += `    <div class="col-twelve" style="height:55%; max-height: 55%; padding-top: 15px;">`;
                            display += '    <p class="line-clamp">' + p_value +  '</p>'
                            /*var categories = item["categories"];
							for (var i=0; i<categories.length; i++){
                            	display += `  <a href="#"><i>#${categories[i]}</i></a> &nbsp;`
                            }
							display += '    </p>'*/
                            display += `    </div>`;
                            
                            display += `    <div class="col-twelve" style="max-height:15%">`;
                            display += `    <a href="${item.link}" target="_blank" class="button custom-button" >Read More</a>`;
                            display += `    </div>`;
                            display += `  </div>
                                        </div>`;
                            return k < 10;
                        }
                    );
                    resolve($content.html(display));
                }
            }
        );
    });
    
    mediumPromise.then(function() {
        //Pagination
        pageSize = 3;
        var pageCount = $(".medium-card").length / pageSize;
        for (var i = 0; i < pageCount; i++) {
            $("#pagin").append(`<a class="page-link" href="#">${(i + 1)}</a>`);
        }

        $("#pagin a:nth-child(1)").addClass("active");
        showPage = function (page) {
            $(".medium-card").hide();
            $(".medium-card").each(function (n) {
                if (n >= pageSize * (page - 1) && n < pageSize * page)
                    $(this).show();
            });
        }

        showPage(1);

        $("#pagin a").click(function () {
            $("#pagin a").removeClass("active");
            $(this).addClass("active");
            showPage(parseInt($(this).text()))
            return false;
        });
    });
  
});

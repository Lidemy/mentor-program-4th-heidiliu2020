import $ from 'jquery';

export function getComments(apiUrl, siteKey, before, cb) {
  let showURL = `${apiUrl}/api_comments.php?site_key=${siteKey}`;
  if (before) {
    showURL += '&before=' + before;
  }
  $.ajax({
    url: showURL
  }).done(function (data) {
    cb(data);
  });
}

export function addComments(apiUrl, siteKey, data, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comments.php`,
    data
  }).done(function(data) {
    cb(data);
  });
}

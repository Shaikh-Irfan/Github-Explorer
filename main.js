$(document).ready(function() {
  $('#searchForm').on('submit', function(e) {
    e.preventDefault();
    var username = $('#searchQuery').val();
    searchProfiles(username);
  });
});

function searchProfiles(username) {
  var apiUrl = 'https://api.github.com/search/users?q=' + username;
  $.getJSON(apiUrl)
    .done(function(data) {
      var profiles = data.items;
      displaySearchResults(profiles);
    })
    .fail(function() {
      console.log('Failed to fetch search results for ' + username);
    });
}

function displaySearchResults(profiles) {
  var searchResultsContainer = $('#searchResultsContainer');
  searchResultsContainer.empty();

  if (profiles.length > 0) {
    for (var i = 0; i < profiles.length; i++) {
      var profile = profiles[i];
      var profileName = profile.login;
      var profilePicture = profile.avatar_url;

      var resultItem = $('<div>').addClass('search-result-item');
      var profilePictureElement = $('<img>').addClass('search-profile-picture').attr('src', profilePicture);
      var profileNameElement = $('<span>').addClass('search-profile-name').text(profileName);

      resultItem.append(profilePictureElement, profileNameElement);
      searchResultsContainer.append(resultItem);
    }
  } else {
    var noResultsMessage = $('<p>').text('No similar profiles found.');
    searchResultsContainer.append(noResultsMessage);
  }
}

$(document).on('click', '.search-profile-name', function() {
  var selectedProfile = $(this).text();
  var profileUrl = 'profile.html?username=' + selectedProfile;
  window.location.href = profileUrl;
});



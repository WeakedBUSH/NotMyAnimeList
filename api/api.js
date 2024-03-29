export async function getPopularAnime(setData) {
    var query = `query ($page: Int, $perPage: Int,) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            perPage
            currentPage
            lastPage
            hasNextPage
          }
          media(type: ANIME, sort:POPULARITY_DESC ,isAdult: false) {
            id
            seasonYear
            status
            episodes
            favourites
            description (asHtml : false)
            title {
              romaji
              english
              native
            }
            coverImage {
              extraLarge
              large
              medium
              color
            }
            type
            genres
            characters (sort: FAVOURITES_DESC) {
              pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
              }
              nodes{
                id
                favourites
                gender
                image{
                 large
                }
                name {
                  full
                  native
                }
              }
            }
          }
        }
      }
      `

      
          
          // Define our query variables and values that will be used in the query request
          var variables = {
          page : 1,
          perPage: 20,
          };
          
          
          // Define the config we'll need for our Api request
          var url = 'https://graphql.anilist.co',
          options = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
              },
              body: JSON.stringify({
                  query: query,
                  variables: variables
              })
          };
          
          // Make the HTTP Api request
          fetch(url, options).then(handleResponse)
                         .then((data) => handleData(data, setData))
                         .catch(handleError);
          
          function handleResponse(response) {
          return response.json().then(function (json) {
              return response.ok ? json : Promise.reject(json);
          });
          }
          
          
          function handleData(data, setData) {
          setData(data.data.Page.media);
          // console.log('---------------------------')
          // console.log(data);
          // console.log('---------------------------')
          }
          
          function handleError(error) {
          alert('Error, check console');
          console.error(error);
          }
}
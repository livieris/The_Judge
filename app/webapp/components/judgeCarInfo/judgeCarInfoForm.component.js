(function(){
    angular.module('app').component('judgeCarInfoForm', {
        bindings: {
          carInfo: '=',
          changeTab: '&'
        },
        controller: judgeCarInfoFormController,
        controllerAs: '$ctrl',
        templateUrl: './app/components/judgeCarInfo/judgeCarInfoForm.component.html'
    });
    function judgeCarInfoFormController (
        $state,
        $location,
        $scope,
        $q
    ) {
      //bindings
        var $ctrl = angular.extend(this, {
            $onInit: init,
            querySearch: querySearch,
            loadAll: loadAll,
            createFilterFor: createFilterFor,
            selectedItemChange: selectedItemChange,
            querySearchState: querySearchState,
            loadAllState: loadAllState,
            createFilterForState: createFilterForState,
            selectedItemChangeState: selectedItemChangeState,
            querySearchCity: querySearchCity,
            loadAllCity: loadAllCity,
            createFilterForCity: createFilterForCity,
            selectedItemChangeCity: selectedItemChangeCity
        });

        function init() {
        }
        //start of autocomplete


        // list of `state` value/display objects
        $ctrl.makes        = loadAll();
        $ctrl.selectedItem  = null;
        $ctrl.searchText    = null;
        $ctrl.querySearch   = querySearch;

            // ******************************
            // Internal methods
            // ******************************

            /**
             * Search for states... use $timeout to simulate
             * remote dataservice call.
             */
             function querySearch (query) {
               var results = query ? $ctrl.makes.filter( createFilterFor(query) ) : $ctrl.makes;
               return results;
             }


            /**
             * Build `states` list of key/value pairs
             */
            function loadAll() {
              var allMakes = 'Chrysler, DeSoto, Dodge, Eagle, Fargo, Imperial, Jeep,\
                              Plymouth, Ram, SRT, Ford, Continental, Edsel, Lincoln, Mercury, \
                              GMC, Buick, Cadillac, Chevrolet, Pontiac, Oldsmobile, Saturn, AMC';

              return allMakes.split(/, +/g).map( function (state) {
                return {
                  value: state.toLowerCase(),
                  display: state
                };
              });
            }
            //grabs selected item and binds to carinfo make. for autocomplete binding of value
            function selectedItemChange(item){
              $ctrl.carInfo.make = item.display;
            }
            /**
             * Create filter function for a query string
             */
            function createFilterFor(query) {
              var lowercaseQuery = angular.lowercase(query);
              return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
              };

            }

            //start of autocomplete for states
            $ctrl.states        = loadAllState();
            $ctrl.selectedItemState  = null;
            $ctrl.searchTextState    = null;
            $ctrl.querySearchState   = querySearchState;

            function querySearchState (query) {
              var results = query ? $ctrl.states.filter( createFilterForState(query) ) : $ctrl.states;
              return results;
            }


           /**
            * Build `states` list of key/value pairs
            */
           function loadAllState() {
             var allStates = 'Alabama,  Alaska,  Arizona,  Arkansas,  California,  Colorado,  Connecticut,  Delaware, \
                      Florida,  Georgia,  Hawaii,  Idaho,  Illinois,  Indiana,  Iowa,  Kansas,  Kentucky,  Louisiana, \
                      Maine,  Maryland,  Massachusetts,  Michigan,  Minnesota,  Mississippi,  Missouri,  Montana, \
                      Nebraska,  Nevada,  New Hampshire,  New Jersey,  New Mexico,  New York,  North Carolina, \
                      North Dakota,  Ohio,  Oklahoma,  Oregon,  Pennsylvania,  Rhode Island,  South Carolina, \
                      South Dakota,  Tennessee,  Texas,  Utah,  Vermont,  Virginia,  Washington,  West Virginia, \
                      Wisconsin,  Wyoming';

             return allStates.split(/,  +/g).map( function (state) {
               return {
                 value: state.toLowerCase(),
                 displayState: state
               };
             });
           }
           //grabs selected item and binds to carinfo make. for autocomplete binding of value
           function selectedItemChangeState(item){
             $ctrl.carInfo.state = item.displayState;
           }
           /**
            * Create filter function for a query string
            */
           function createFilterForState(query) {
             var lowercaseQuery = angular.lowercase(query);
             return function filterFn(state) {
               return (state.value.indexOf(lowercaseQuery) === 0);
             };

           }

           //start of autocomplete for cities
           $ctrl.cities        = loadAllCity();
           $ctrl.selectedItemCity  = null;
           $ctrl.searchTextCity    = null;
           $ctrl.querySearchCity   = querySearchCity;

           function querySearchCity (query) {
             var results = query ? $ctrl.cities.filter( createFilterForCity(query) ) : $ctrl.cities;
             return results;
           }


          /**
           * Build `states` list of key/value pairs
           */
          function loadAllCity() {
              var allCity = 'Abbotsford,  Adams,  Adell village,  Albany village,  Algoma,  Allouez village,  Alma,  Alma Center village,  Almena village,  Almond village,  Altoona,  Amery,  Amherst village, Amherst Junction village, Aniwa village, Antigo, Appleton, Arcadia, Arena village, Argyle village, Arlington village, Arpin village, Ashland, Ashwaubenon village, Athens village, Auburndale village, Augusta, Avoca village, Bagley village, Baldwin village, Balsam Lake village, Bangor village, Baraboo, Barneveld village, Barron, Bay Cityvillage, Bayfield, Bayside village, Bear Creek village, Beaver Dam, Belgium village, Bell Center village, Belleville village, Bellevue Town, Belmont village, Beloit, Benton village, Berlin, Big Bend village, Big Falls village, Birchwood village, Birnamwood village, Biron village, Black Creek village, Black Earth village, Black River Falls, Blair, Blanchardville village, Bloomer, Bloomington village, Blue Mounds village, Blue River village, Boaz village, Bohners Lake, Bonduel village, Boscobel, Bowler village, Boyceville village, Boyd village, Brandon village, Brice Prairie, Brillion, Brodhead, Brokaw village, Brookfield, Brooklyn village, Brown Deer village, Browns Lake, Brownsville village, Browntown village, Bruce village, Buffalo City, Burlington, Butler village, Butternut village, Cadott village, Cambria village, Cambridge village, Cameron village, Campbellsport village, Camp Douglas village, Camp Lake, Cascade village, Casco village, Cashton village, Cassville village, Catawba village, Cazenovia village, Cecil village, Cedarburg, Cedar Grove village, Centuria village, Chain O Lakes-King, Chaseburg village, Chenequa village, Chetek, Chief Lake, Chilton, Chippewa Falls, Clayton village, Clear Lake village, Cleveland village, Clinton village, Clintonville, Clyman village, Cobb village, Cochrane village, Colby, Coleman village, Colfax village, Coloma village, Columbus, Combined Locks village, Como, Conrath village, Coon Valley village, Cornell, Cottage Grove village, Couderay village, Crandon, Crivitz village, Cross Plains village, Cuba City, Cudahy, Cumberland, Curtiss village, Dallas village, Dane village, Darien village, Darlington, Deerfield village, Deer Park village, DeForest village, Delafield, Delavan, Delavan Lake, Denmark village, De Pere, De Soto village, Dickeyville village, Dodgeville, Dorchester village, Dousman village, Downing village, Doylestown village, Dresser village, Durand, Eagle village, Eagle Lake, Eagle River, Eastman village, East Troy village, Eau Claire, Eden village, Edgar village, Edgerton, Egg Harbor village, Eland village, Elderon village, Eleva village, Elkhart Lake village, Elkhorn, Elk Mound village, Ellsworth village, Elm Grove village, Elmwood village, Elmwood Park village, Elroy, Embarrass village, Endeavor village, Ephraim village, Ettrick village, Evansville, Evergreen, Exeland village, Fairchild village, Fairwater village, Fall Creek village, Fall River village, Fennimore, Fenwood village, Ferryville village, Fitchburg, Fond du Lac, Fontana-on-Geneva Lake village, Footvillevillage, Forestville village, Fort Atkinson, Fountain City, Fox Lake, Fox Point village, Francis Creek village, Franklin, Franksville, Frederic village, Fredonia village, Fremont village, French Island, Friendship village, Friesland village, Galesville, Gays Mills village, Genoa village, Genoa City village, Germantown village, Gillett, Gilman village, Glenbeulah village, Glendale, Glen Flora village, Glenwood City, Grafton village, Granton village, Grantsburg village, Gratiot village, Green Bay, Greendale village, Greenfield, Green Lake, Greenwood, Gresham village, Hales Corners village, Hammond village, Hancock village, Hartford, Hartland village, Hatley village, Haugen village, Hawkins village, Hayward, Hazel Green village, Hebron, Helenville, Hewitt village, Highland village, Hilbert village, Hillsboro, Hixton village, Hollandale village, Holmen village, Horicon, Hortonville village, Howard village, Howards Grove village, Hudson, Hurley, Hustisford village, Hustler village, Independence, Ingram village, Iola village, Iron Ridge village, Ironton village, Ixonia, Jackson village, Janesville, Jefferson, Johnson Creek village, Junction City village, Juneau, Kaukauna, Kekoskee village, Kellnersville village, Kendall village, Kennan village, Kenosha, Keshena, Kewaskum village, Kewaunee, Kiel, Kimberly village, Kingston village, Knapp village, Kohler village, Lac du Flambeau, Lac La Belle village, La Crosse, Ladysmith, La Farge village, Lake Delton village, Lake Geneva, Lake Koshkonong, Lake Lac La Belle, Lake Mills, Lake Nebagamon village, Lake Ripley, Lake Shangrila, Lake Wazeecha, Lake Wisconsin, Lake Wissota, Lancaster, Lannon village, La Valle village, Legend Lake, Lena village, Lime Ridge village, Linden village, Little Chute village, Little Round Lake, Livingston village, Lodi, Loganville village, Lohrville village, Lomira village, Lone Rock village, Lowell village, Loyal, Lublin village, Luck village, Luxemburg village, Lyndon Station village, Lynxville village, McFarland village, Madison, Maiden Rock village, Manawa, Manitowoc, Maple Bluff village, Marathon City village, Maribel village, Marinette, Marion, Markesan, Marquette village, Marshall village, Marshfield, Mason village, attoon village, Mauston, Mayville, Mazomanie village, Medford, Mellen, Melrose village, Melvina village, Menasha, Menomonee Falls village, Menomonie, Mequon, Merrill, Merrillan village, Merrimac village, Merton village, Middleton, Middle Village, Milladore village, Milltown village, Milton, Milwaukee, Mineral Point, Minong village, Mishicot village, Mondovi, Monona, Monroe, Montello, Montfort village, Monticello village, Montreal, Mosinee, Mount Calvary village, Mount Hope village, Mount Horeb village, Mount Sterling village, Mukwonago village, Muscoda village, Muskego, Nashotah village, Necedah village, Neenah, Neillsville, Nekoosa, Nelson, village, Nelsonville village, Neopit, Neosho village, Neshkoro village, New Auburn village, New Berlin, Newburg village, New Glarus village, New Holstein, New Lisbon, New London, New Post, New Richmond, Niagara, Nichols village, North Bay village, North Fond du Lac village, North Freedom village, North Hudson village, North Prairie village, Norwalk village, Oak Creek, Oakdale village, Oakfield village, Oconomowoc, Oconomowoc Lake village, Oconto, Oconto Falls, Odanah, Ogdensburg, village, Okauchee Lake, Oliver village, Omro, Onalaska, Oneida, Ontario village, Oostburg village, Oregon village, Orfordville village, Osceola village, Oshkosh, Osseo, Owen, Oxford village, Paddock Lake village, Palmyra village, Pardeeville village, Park Falls, Park Ridge village, Patch Grove village, Pell Lake, Pepin village, Peshtigo, Pewaukee, Pewaukee village, Phillips, Pigeon Falls village, Pittsville, Plain village, Plainfield village, Platteville, Pleasant Prairie village, Plover village, Plum, City village, Plymouth, Poplar village, Portage, Port Edwards village, Port Washington, Potosi village, Potter village, Potter Lake, Pound village, Powers Lake, Poynette village, Prairie du Chien, Prairie du Sac village, Prairie Farm village, Prentice village, Prescott, Princeton, Pulaski village, Racine, Radisson village, Randolph village, Random Lake village, Readstown village, Redgranite village, Reedsburg, Reedsville village, Reeseville village, Reserve, Rewey village, Rhinelander, Rib Lake village, Rib, Mountain, Rice Lake, Richland Center, Ridgeland village, Ridgeway village, Rio village, Ripon, River Falls, River Hills village, Roberts village, Rochester village, Rockdale village, Rockland village, Rock Springs village, Rome, Rosendale village, Rosholt village, Rothschild village, Rudolph village, St. Cloud village, St. Croix Falls, St. Francis, St. Nazianz village, Sauk City village, Saukville village, Scandinavia village, Schofield, Seymour, Seymour, Sharon village, Shawano, Sheboygan, Sheboygan Falls, Sheldon, village, Shell Lake, Sherwood village, Shiocton village, Shorewood village, Shorewood Hills village, Shullsburg, Silver Lake village, Siren village, Sister Bay village, Slinger village, Soldiers Grove village, Solon Springs village, Somerset village, South Milwaukee, South Wayne village, Sparta, Spencer village, Spooner, Spring Green village, Spring Valley village, Stanley, Star Prairie village, Stetsonville village, Steuben village, Stevens Point, Stockbridge village, Stockholm village, Stoddard village, Stoughton, Stratford village, Strum village, Sturgeon Bay, Sturtevant village, Sullivan village, Sun Prairie, Superior, Superior village, Suring village, Sussex village, Tainter Lake, Taylor village, Tennyson village, Theresa village, Thiensville village, Thorp, Tigerton village, Tomah, Tomahawk, Tony village, Trempealeau village, Turtle Lake village, Twin Lakes village, Two Rivers, Union Center village, Union Grove village, Unity village, Valders village, Verona, Vesper village, Viola village, Viroqua, Waldo village, Wales village, Walworth village, Warrens village, Washburn, Waterford village, Waterford North, Waterloo, Watertown, Waukesha, Waunakee village, Waupaca, Waupun, Wausau, Wausaukee village, Wautoma, Wauwatosa, Wauzeka village, Webster village, West Allis, West Baraboo village, West Bend, Westby, Westfield village, West Milwaukee village, Weston village, West Salem village, Weyauwega, Weyerhaeuser village, Wheeler village, Whitefish Bay village, Whitehall, White Lake village, Whitelaw village, Whitewater, Whiting village, Wild Rose village, Williams Bay village, Wilson village, Wilton village, Wind Lake, ind Point village, , Windsor, Winneconne village, Winter village, Wisconsin Dells, Wisconsin Rapids, Withee village, Wittenberg village, Wonewoc village, Woodman village, Woodville village, Wrightstown village, Wyeville village, Wyocena village, Yuba village, Zoar';

            return allCity.split(/, +/g).map( function (city) {
              return {
                value: city.toLowerCase(),
                displayCity: city
              };
            });
          }
          //grabs selected item and binds to carinfo make. for autocomplete binding of value
          function selectedItemChangeCity(item){
            $ctrl.carInfo.city = item.displayCity;
          }
          /**
           * Create filter function for a query string
           */
          function createFilterForCity(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(city) {
              return (city.value.indexOf(lowercaseQuery) === 0);
            };

          }


        }
})();

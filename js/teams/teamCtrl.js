angular.module('nbaRoutes')
// the resolved data from the router needs to be injected into the controller
    .controller('teamCtrl', function ($scope, $stateParams, teamService, teamData) {

        $scope.teamData = teamData;
        $scope.newGame = {};
        $scope.showNewGameform = false;
        $scope.toggleNewGameForm = function() {
            $scope.showNewGameform = !$scope.showNewGameform;
        };

        if ($stateParams.team === 'utahjazz') {
            $scope.homeTeam = "Utah Jazz";
            $scope.logoPath = '../../images/jazz-logo.png';
        } else if ($stateParams.team === 'miamiheat') {
            $scope.homeTeam = "Miami Heat";
            $scope.logoPath = 'images/heat-logo.png';
        } else if ($stateParams.team === 'losangeleslakers') {
            $scope.homeTeam = "Los Angeles Lakers";
            $scope.logoPath = 'images/lakers-logo.png';
        }

        $scope.submitGame = function() {
            $scope.newGame.homeTeam = $scope.homeTeam.split(' ').join('').toLowerCase();
            teamService.addNewGame($scope.newGame)
                .then(function() {
                    teamService.getTeamData($stateParams.team)
                        .then(function(data) {
                            $scope.teamData = data;
                            $scope.newGame = {};
                            $scope.showNewGameform = false;
                        });
                });
        };

});

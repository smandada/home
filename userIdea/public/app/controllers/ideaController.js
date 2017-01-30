angular.module('ideaCtrl', ['ideaService'])

.controller('IdeaController', function(Idea, socketIO) {
  var vm = this;

  vm.ideas = [];
  vm.ideaData = {
    content: ''
  };
  vm.message = '';

  Idea.allIdeas().then(function(resp) {
    vm.ideas = resp.data;
  });

  vm.createIdea = function() {
    Idea.create(vm.ideaData).then(function(resp) {
      vm.ideaData = {
        content: ''
      };
      vm.message = resp.data.message;
    }); 
  };

  socketIO.on('idea', function(data) {
    vm.ideas.push(data);
  })
});

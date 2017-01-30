angular.module('ideaCtrl', ['ideaService'])

.controller('IdeaController', function(Idea) {
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
      vm.ideas.push(resp.data.idea);
    }); 
  };
});

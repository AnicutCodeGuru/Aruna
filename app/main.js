angular.module('todoApp', [])
  .controller('TodoListController', function($http,$q) {
       var vm = this;
	   vm.model={
			applicationNos:"",
			applicantMob:"",
			responseList:[],
			searchText:""
	   }
	   
	   
	   vm.getAppDetail=function(){
		   var cardDetls=[];
		   var applicationNos = vm.model.applicationNos.split("\n");
		   var applicantMob = vm.model.applicantMob.split("\n");
		   
		   var httpRequests=[];
		   
		   for(var i=0;i<applicationNos.length;i++){
			   httpRequests.push($http({method:"post",url:"/hdfc",data:{appNo:applicationNos[i], mobile:applicantMob[i]}}));
		   }
		   
		   $q.all(httpRequests).then(function(resp){
				vm.model.responseList=[];
				for(var i=0;i<resp.length;i++){
					var data = resp[i].data.test.replace("Result:#","").split("#");
					var appDetl={
						applicationNo: applicationNos[i],
						mobileNo: applicantMob[i],
						statusMsg:data[0],
						refNo : data[1],
						status: data[2]
					}
					vm.model.responseList.push(appDetl)
				}
			   console.log(resp);
		   },function(){
			   alert("Some thing is wrong")
		   })
		   
	   }
  });
  

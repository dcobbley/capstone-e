# capstone-e 

Using the Test Runner:
--

###Install Node, Grunt & Bower
**Node must be installed first**

Download and Install Node  

	https://nodejs.org/download/  

Install Grunt    

    $npm install -g grunt  
    
Install Bower

    $npm install -g bower

--
###Install Dependencies

Install project dependencies: 

    $npm install

Install the Test Runner dependencies

	$bower install ./testrunner

--
###Run Test Runner

Run tests and display results on devices or simulator

	$grunt

Run tests on simulator version 3.0

	$grunt test --sim=3.0
	
Build our framework

	$grunt build
	
Get complete list of options

	$grunt help

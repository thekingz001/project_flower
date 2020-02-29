<?php

	echo "testttt";
// header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json; charset=UTF-8");

// if( isset($_GET["e"]) && isset($_GET["p"]) ){
// 	$username=$_GET["e"];		$password=$_GET["p"];	
// 		if( !empty($username)  && !empty($password)  ){	
			// $conn = new mysqli("localhost", "root", "", "flower2");								
			
			// To protect MySQL injection for Security purpose		
			// $username = stripslashes($username);		
			// $password = stripslashes($password);		
			// $username = $conn->real_escape_string($username);		
			// $password = $conn->real_escape_string($password);		
			// $password = md5($password);		
			
			// $hostname_con11 = "localhost";
			// $database_con11 = "flower2";
			// $username_con11 = "root";
			// $password_con11 = "";
			// $conn = mysqli_connect($hostname_con11, $username_con11, $password_con11,$database_con11) or trigger_error(mysql_error(),E_USER_ERROR);

			// $query = "SELECT * FROM users where u_verified = 1 and u_id like '".$username."' and u_password like '".$password."'";	
					
			// $result = $conn->query($query);		
			
			// $outp = "";				
		
			// if( $rs=$result->fetch_array(MYSQLI_ASSOC)) {			
				
			// 	if ($outp != "") {echo($outp);}
				
			// 	$outp .= '{"u_name":"'  . $rs["u_name"] . '",';			
			// 	$outp .= '"u_id":"'   . $rs["u_id"]        . '",';			
			// 	$outp .= '"u_phone":"'   . $rs["u_phone"]        . '",';			
			// 	$outp .= '"u_address":"'   . $rs["u_address"]        . '",';			
			// 	$outp .= '"u_pincode":"'. $rs["u_pincode"]     . '"}';		
			// }	
			
			// $outp ='{"data":'.$outp.'}';	
				
			// $conn->close();		
			// echo(" test = ");	

			// $myObj->name = "John";
			// $myObj->age = 30;
			// $myObj->city = "New York";
			// $myJSON = json_encode($myObj);
			// $test ='{"data":'.$myJSON.'}';
			// echo $test;
	// 	}
	// }
	
?> 
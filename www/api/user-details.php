<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if( isset($_GET["e"]) && isset($_GET["p"]) ){
	$username=$_GET["e"];		$password=$_GET["p"];	
		if( !empty($username)  && !empty($password)  ){	
			$conn = new mysqli("localhost", "root", "rootP@ssw0rd", "flower2");								
			
			// To protect MySQL injection for Security purpose		
			$username = stripslashes($username);		
			$password = stripslashes($password);		
			$username = $conn->real_escape_string($username);		
			$password = $conn->real_escape_string($password);		
			$password = md5($password);		
			
			$query = "SELECT * FROM users where u_verified = 1 and u_id like '".$username."' and u_password like '".$password."'";	
					
			$result = $conn->query($query);		$outp = "";				
		
			if( $rs=$result->fetch_array(MYSQLI_ASSOC)) {			
				
				if ($outp != "") {echo($outp);}
				
				$outp .= '{"u_name":"'  . $result["u_name"] . '",';			
				$outp .= '"u_id":"'   . $result["u_id"]        . '",';			
				$outp .= '"u_phone":"'   . $result["u_phone"]        . '",';			
				$outp .= '"u_address":"'   . $result["u_address"]        . '",';			
				$outp .= '"u_pincode":"'. $result["u_pincode"]     . '"}';		
			}	
			
			$outp ='{"data":'.$outp.'}';		
			$conn->close();		
			echo($outp);	
		}
	}
	
?> 
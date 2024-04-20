int IN1=2 ;
int IN2=3 ;
int IN3=4 ;
int IN4=8;
int EN1=9;
int EN2=10;
char c;
int i;

void setup() {
  // put your setup code here, to run once:
  pinMode(IN1,OUTPUT);
  pinMode(IN2,OUTPUT);
  pinMode(IN3,OUTPUT);
  pinMode(IN4,OUTPUT);
  pinMode(EN2,OUTPUT);
  pinMode(EN2,OUTPUT);
  Serial.begin(9600);


}

void loop() {
  
  while(Serial.available()>0){
    c=Serial.read();
    Serial.println(c);
  }
 

  if(c=='A'){
    digitalWrite(IN1,HIGH);
    digitalWrite(IN2,LOW);
    digitalWrite(IN3,HIGH);
    digitalWrite(IN4,LOW);
    analogWrite(EN1,255);
      analogWrite(EN2,255);

  }
  else if(c=='D'){
    digitalWrite(IN1,HIGH);
    digitalWrite(IN2,LOW);
    digitalWrite(IN3,HIGH);
    digitalWrite(IN4,LOW);
    for(i=255;i>80;i--){
      analogWrite(EN1,i);
      analogWrite(EN2,i);
      
      delay(30);
    }

  }
  else if(c=='S'){
    digitalWrite(IN1,HIGH);
    digitalWrite(IN2,LOW);
    digitalWrite(IN3,HIGH);
    digitalWrite(IN4,LOW);
    for(i=255;i>0;i--){
      analogWrite(EN1,i);
      analogWrite(EN2,i);
      
      delay(10);
    }


   }
   else if(c=='K'){
     digitalWrite(IN1,LOW);
    digitalWrite(IN2,LOW);
    digitalWrite(IN3,LOW);
    digitalWrite(IN4,LOW);
   }

}

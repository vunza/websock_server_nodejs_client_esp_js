#include <Arduino.h>
#include "WebSocketClient.h"
#include "ESP8266WiFi.h"

WebSocketClient ws(true);

void setup() {
  Serial.begin(115200);
  WiFi.begin("TPLINK", "gregorio@2012");

  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

   
   Serial.println("\nConnected : ");
  Serial.println(WiFi.localIP());
}

void loop() {
  
  if (!ws.isConnected()) {
    ws.connect("ws-server-client-esp-js.onrender.com", "/", 443);
  } else {
    ws.send("hello");

    String msg;
    if (ws.getMessage(msg)) {
      Serial.println(msg);
    }
  }
  delay(500);
}

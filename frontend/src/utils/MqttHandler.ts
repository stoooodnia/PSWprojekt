import * as mqtt from "mqtt";

export const Client = mqtt.connect("ws://127.0.0.1", {
  port: 8081,
});

export const MqttConnection = () => {
  Client.on("connect", () => {
    console.log("Connected");
    Client.subscribe("test", (err) => {
      if (!err) {
        Client.publish("test", "Hello mqtt");
      }
    });
    Client.subscribe("Chat");
  });
};

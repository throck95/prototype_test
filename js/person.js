/**
 * Created by gibsond on 10/6/2015.
 */

var Person = Class.create({
    initialize: function(name){
        this.name = name;
    },
    say: function(message){
        return this.name + ": " + message;
    }
});

var Pirate = Class.create(Person,{
    say:function($super,message){
        return $super(message) + ", yarrgh!!!";
    }
});

var bob = new Person("Bob");
var john = new Pirate("Long John Silvers");

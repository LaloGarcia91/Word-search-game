
function createNewElement(objectParameter){
    /*
    This are ALL of the properties that this function accepts, if you use this function you can either use all of the properties mentioned below, or only 1. It is not a MUST to use all of the properties. As you can see, this function receives as parameter, an object just like the one below. Again, you don't have to use all of the properties.

    The following object example is also NEEDED to use this function, so please don't delete it. Although feel free to do whatever you want with this function.
    */
    var elementObject = {
        returnAsString:objectParameter.returnAsString,
        element:objectParameter.element,
        classes:objectParameter.classes,
        attributes:objectParameter.attributes,
        id:objectParameter.id,
        text:objectParameter.text,
        html:objectParameter.html,
        value:objectParameter.value,
        insertElements:objectParameter.insertElements
    };



    /*
    Object properties explained:
    START
    */
    var PropertiesUsageExample;


    /* 1. element (string): Indicates which element is going to be created. */
    // example
    PropertiesUsageExample = {
        element:'div'
    };


    /* 2. classes (array): Indicates which classes are going to be assigned to that element */
    // example
    PropertiesUsageExample = {
        classes:['my_class_1', 'my_class_2', 'my_class_3']
    };


    /* 3. attributes (array with arrays): Indicates which attributes you want to add to your element. */
    // example
    PropertiesUsageExample = {
        attributes:[
            ['data-attribute-example-1', 'value 1'],
            ['data-attribute-example-2', 'value 2'],
            ['data-attribute-example-3', 'value 3']
        ]
    };


    /* 4. id (string): Indicates the id that the element will have. */
    // example
    PropertiesUsageExample = {
        id:'my_id_example'
    };



    /* 5. text (string): Indicates the textContent you want to assign to the element. */
    // example
    PropertiesUsageExample = {
        text:'my text content example'
    };



    /* 6. html (string): Indicates the innerHTML you want to assign to the element. */
    // example
    PropertiesUsageExample = {
        html:'my inner html example'
    };



    /* 7. value (string): Indicates the value you want to assign to the element.
    This property will only work with element that do accept a value such as an Input.
    */
    // example
    PropertiesUsageExample = {
        value:'this is a value'
    };



    /* 8. insertElements (array of JSON objects): Here, you can insert elements to your current element you are creating. 
    The JSON objects used in this array have all of this properties mentioned earlier including this one. Since it works with this same function.
    */
    // example
    PropertiesUsageExample = {
        insertElements:[
            {
                element:'p',
                text:'this is an inserted P element',
                classes:['p_element_class_1']
            },

            {
                element:'div',
                text:'this is an inserted DIV element',
                id:'p_id'
            },

            {
                element:'img',
                id:'img_tag_id',
                attributes:[
                    ['src', '/images/imageExample.png'],
                    ['data-img-example', 'the value'],
                ]
            }
        ]
    };



    /* 9. returnAsString (boolean): Indicates that you want the 'object' to be converted and RETURNED as a string. That way you will not need to use 'appendChild' in order to insert the element/object you just created to wherever you were going to insert it... Since you will get the object as a string, you just apply that string to the 'innerHTML' of the selector you were planning to insert the element(s) */

    // example
    PropertiesUsageExample = {
        returnAsString:true
    };


    /*
    END
    Object properties explained:
    */



    if(elementObject.element){
        var newElement = document.createElement(elementObject.element);


        if(elementObject.classes && elementObject.classes[0]){
            newElementClasses();
        }

        if(elementObject.attributes){
            newElementAttributes();
        }

        if(elementObject.id){
            newElementId();
        }

        if(elementObject.text){
            newTextContent();
        }

        if(elementObject.html){
            newInnerHTML();
        }

        if(elementObject.value){
            newValue();
        }

        if(elementObject.insertElements){
            newElementInsertElements();
        }




        switch(elementObject.returnAsString){
            case true:
                return newElement.outerHTML;

            default:
                return newElement;
        }


    } else {
        console.log('No object parameter was passed in order to create an element.');
        return false;
    }



    function newElementClasses(){
        var allClasses = elementObject.classes;

        Array.prototype.forEach.call(allClasses, function(className){
            if(className.length>0){
                newElement.classList.add(className.trim());
            }
        });
    }

    //

    function newElementAttributes(){
        var allAttributes = elementObject.attributes;

        Array.prototype.forEach.call(allAttributes, function(attribute){
            /*
            first parameter (index 0) is the attribute name, the second parameter (index 1) is the attribute value
            */
            newElement.setAttribute(attribute[0], attribute[1]);
        });
    }

    //

    function newElementInsertElements(){
        var allElements = elementObject.insertElements;

        Array.prototype.forEach.call(allElements, function(element){
            newElement.appendChild(createNewElement(element));
        });
    }

    //

    function newElementId(){
        newElement.setAttribute('id', elementObject.id);
    }

    //

    function newTextContent(){
        newElement.textContent = elementObject.text;
    }

    //

    function newInnerHTML(){
        newElement.innerHTML = elementObject.html;
    } 

    //

    function newValue(){
        newElement.value = elementObject.value;
    } 

}
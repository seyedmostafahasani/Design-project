var month_shamsi = ["فروردین", "اردیبهشت" , "خرداد" , "تیر" , "مرداد" , "شهریور" , "مهر" , "آبان" , "آذر" , "دی" , "بهمن" , "اسفند" ];
var num_miladi = [31 , 28 , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31];
var num_Kabise_miladi = [31 , 29 , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31];
var num = [31 , 31 , 31 , 31 , 31 , 31 , 30 , 30 , 30 , 30 , 30 , 29];
var num_Kabise = [31 , 31 , 31 , 31 , 31 , 31 , 30 , 30 , 30 , 30 , 30 , 30];
var kabise = [1 , 5 , 9 , 13 , 18 , 22 , 26 , 30];
var kabise_miladi = 0;
var kabise_shamsi = 0;
var list =[];
var p = new PropertYear();
$(window).load(function(){

    $('#setting').on('click' , function(){
        $('.submenu').toggleClass('show');
    });

    init();

    var obj = cal_miladi_shamsi();
    list[0] = obj.year;
    list[1] = obj.month;
    list[2] = obj.day;
//    alert(list[0]+" "+list[1]+" "+list[2]);
    var d = new Date();

    $('#year').text(obj.year);
    $('#name-of-month').text(month_shamsi[obj.month]);
    var object = complex(obj.year,obj.month,1);
    show(obj.year , obj.day , object.day_of_week , obj.month);

    $('#arrow-left').on('click' ,function(e){
        var m = p.getMonth()-1;
        for(var i=0 ; i<42 ; i++){
            $('#'+i+'num').remove();

        }
        $('.days .badboy').remove();

        init();

        if(p.getMonth()>0){
            setSeconde(p.getYear() , m , 1);
            var obj = complex(p.getYear() , m , 1);
            if(p.getYear()==list[0] && p.getMonth()==list[1]){
                show(p.getYear() , list[2] , obj.day_of_week , p.getMonth());
            }else{
                show(p.getYear() , p.getDay() , obj.day_of_week , p.getMonth());
            }
            $('#year').text(p.getYear());
            $('#name-of-month').text(month_shamsi[m]);

        }else{
            var year = p.getYear()-1;
            setSeconde(year , 11 , 1);
            var obj = complex(year , 11 , 1);
            if(p.getYear()==list[0] && p.getMonth()==list[1]){
                show(p.getYear() , list[2] , obj.day_of_week , p.getMonth());
            }else{
                show(year , p.getDay() , obj.day_of_week , p.getMonth());
            }
            $('#year').text(year);
            $('#name-of-month').text(month_shamsi[11]);
        }
        e.preventDefault();
    });

    $('#arrow-right').on('click' , function(e){
        var m = p.getMonth()+1;
        for(var i=0 ; i<42 ; i++){
            $('#'+i+'num').remove();
        }
        $('.days .badboy').remove();

        init();

        if(p.getMonth()<11){
            setSeconde(p.getYear() , m , 1);
            var obj = complex(p.getYear() , m , 1);
            if(p.getYear()==list[0] && p.getMonth()==list[1]){
                show(p.getYear() , list[2] , obj.day_of_week , p.getMonth());
            }else{
                show(p.getYear() , p.getDay() , obj.day_of_week , p.getMonth());
            }
            $('#year').text(p.getYear());
            $('#name-of-month').text(month_shamsi[m]);
        }else{
            var year = p.getYear()+1;
            setSeconde(year , 0 , 1);
            var obj = complex(year , 0 , 1);
            if(p.getYear()==list[0] && p.getMonth()==list[1]){
                show(p.getYear() , list[2] , obj.day_of_week , p.getMonth());
            }else{
                show(year , p.getDay() , obj.day_of_week , p.getMonth());
            }
            $('#year').text(year);
            $('#name-of-month').text(month_shamsi[0]);
        }
        e.preventDefault();
    });
});

function setSeconde(y , m , d){
    var p = new PropertYear();

    p.setYear(y);
    p.setMonth(m);
    p.setDay(d);
}

function complex(y , m , d){
    var counter=0;
    var object={ ye:0 , mo:0 , da:0 , day_of_week:0};

    var mi_year;
    var mi_day;
    var mi_month;
    var total;
    var total_month=0;
    var total_day=0;
    var flag = true;

    if(m==11 || m==10){
        mi_year=y+622;
    }else if(m==9 && d>=12){
        mi_year=y+622;
    }else if(m<=9){
        mi_year=y+621;
    }

    kabise_miladi = Math.floor((mi_year-1)/4);
    kabise_shamsi = Math.floor((y-1)/4);

    var t = y%33;
    for(var i=0 ; i<kabise.length ; i++){
        if (t==kabise[i]){
            flag = false;
            break;
        }
    }

    if(flag==true){
        for(var i=0 ; i<m ; i++){
            total_month += num[i];
        }
    }else{
        for(var i=0 ; i<m ; i++){
            total_month += num_Kabise[i];
        }
    }
//    alert(kabise_miladi+"  "+kabise_shamsi + "  " +y);
    total = ((y-1)*365)+total_month+d+kabise_shamsi;
//alert(total);
    total += 226899;

    total -= kabise_miladi;
    total = total % 365;
//alert(total);
    if (mi_year%4==0 || mi_year%400==0){
        flag = false;
    }else{
        flag = true;
    }

    if(flag == true){

        if(total <= num_miladi[counter]){
            mi_day = total;
            mi_month = 0;

        }else{
            while(total>num_miladi[counter]){
                total -= num_miladi[counter];

                if(total<num_miladi[counter]){
                    mi_day = total;
                    mi_month = counter+1;

                }
                counter++;
            }
        }
    }

    if(flag == false){
        if(total <= num_Kabise_miladi[0]){
            mi_day = total;
            mi_month = 0;
        }else{
            while(total>num_Kabise_miladi[counter]){
                total -= num_Kabise_miladi[counter];
                if(total<num_Kabise_miladi[counter]){
                    mi_day = total;
                    mi_month = counter+1;

                }
                counter+=1;
            }
        }
    }

    object.mo = mi_month;
    object.da = mi_day;
    object.ye = mi_year;

    var date = new Date();
    if(mi_month==0){
        date.setFullYear(mi_year , mi_month , mi_day);
    }else{
        date.setFullYear(mi_year , mi_month , mi_day);
    }
    object.day_of_week = date.getDay();

    return object;
}

function show(year , day , day_of_week , month){
    var select_day = day;
    var bool = true;

    if(day_of_week==6){
        day_of_week=0;
        $('#0num .test').text(1);
        $('#0num #number').addClass('first');

        if(1==select_day && p.getYear()==list[0] && p.getMonth()==list[1]){
            $('#0num #number').addClass('active');
            $('#0num .test').addClass('select');
        }
    }
    else{
        day_of_week++;
        var str="#"+day_of_week+"num";
        $(str+" .test").text(1);
        $(str+' #number').addClass('first');
        if(1==select_day && p.getYear()==list[0] && p.getMonth()==list[1]){
            $(str+' #number').addClass('active');
            $(str+' .test').addClass('select');
        }
    }

    var t = year%33;
    for(var i=0 ; i<kabise.length ; i++){
        if (t==kabise[i]){
            bool = false;
            break;
        }
    }

    if(bool==true){
        length = num[month];
    }
    else{
        length = num_Kabise[month];
    }

    for(var i=1 ; i<length ; i++){
        day_of_week +=1;
        var str = "#"+day_of_week+"num";
        $(str+" .test").text(i+1);

        if((i+1)==select_day) {
            $(str+" #number").addClass('active');
            $(str+' .test').addClass('select');
        }
        if(day_of_week<7){
            $(str+" #number").addClass('first');
        }
        else if(day_of_week>=7){
            $(str+" #number").addClass('other-show');
        }

    }
}

function PropertYear(){}

PropertYear.prototype.setFlag = function(flag) {PropertYear.flag = flag;}

PropertYear.prototype.setYear = function(year) {PropertYear.year = year;}

PropertYear.prototype.setMonth = function(month) {PropertYear.month = month;}

PropertYear.prototype.setDay = function(day) {PropertYear.day = day;}

PropertYear.prototype.getFlag = function() {return PropertYear.flag;}

PropertYear.prototype.getYear = function() {return PropertYear.year;}

PropertYear.prototype.getMonth = function() {return PropertYear.month;}

PropertYear.prototype.getDay = function() {return PropertYear.day;}

function cal_miladi_shamsi(){

    var pYear = new PropertYear();
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var day_of_week = date.getDay;
    var counter=0;
    var length=0;
    var select_day;
    var object={year:0 , month:0 , day:0};

    var num_miladi = [31 , 28 , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31];
    var num_Kabise_miladi = [31 , 29 , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31];
    var num = [31 , 31 , 31 , 31 , 31 , 31 , 30 , 30 , 30 , 30 , 30 , 29];
    var num_Kabise = [31 , 31 , 31 , 31 , 31 , 31 , 30 , 30 , 30 , 30 , 30 , 30];
    var kabise = [1 , 5 , 9 , 13 , 18 , 22 , 26 , 30];
    var kabise_miladi = 0;
    var kabise_shamsi = 0;

    var sh_year;
    var sh_day;
    var sh_month;
    var total;
    var total_month=0;
    var total_day=0;
    var flag = true;

    if (month==0 || month==1){
        sh_year = year-622;
    }
    if (month==2 && day<22){
        sh_year = year-622;
    }
    if (month>=3){
        sh_year = year-621;
    }
    object.year = sh_year;

    if (year%4==0 || year%400==0){
        for(var i=0 ; i<month ; i++){
            total_month += num_Kabise_miladi[i];
        }
    }else{
        for(var j=0 ; j<month ; j++){
            total_month += num_miladi[j];
        }
    }

    kabise_miladi = Math.round((year-1)/4);
    kabise_shamsi = Math.round((sh_year-1)/4);
    total = ((year-1)*365)+(total_month)+day+kabise_miladi;

    total -= 226899;

    total -= kabise_shamsi;

    total = total % 365;

    var t = sh_year%33;

    for(var i=0 ; i<kabise.length ; i++){
        if (t==kabise[i]){
            flag = false;
            break;
        }
    }

    if(flag == true){
        if(total <= num[0]){
            sh_day = total;
            sh_month = 1;
        }else{
            while(total>num[counter]){
                total -= num[counter];
                if(total<num[counter]){
                    sh_day = total;
                    sh_month = counter+1;
                }
                counter++;
            }

        }
    }

    if(flag == false){
        if(total <= num_Kabise[0]){
            sh_day = total;
            sh_month = 1;
        }else{
            while(total>num_Kabise[counter]){
                total -= num_Kabise[counter];
                if(total<num_Kabise[counter]){
                    sh_day = total;
                    sh_month = counter+1;
                }
                counter++;
            }
        }
    }
    pYear.setYear(object.year);
    pYear.setMonth(sh_month);
    pYear.setDay(sh_day);

    object.month=sh_month;
    object.day=sh_day;

    return object;
}

function init(){

    var counter=42;
    var c=0;
    var str;
    for (var i=0 , c=0 ; i<counter ; i++ , c++){
        if(c!=6 && i%7!=0) {
            $('.days').append("<li class=num-day id ="+i+"num> <span class=red></span> <span class=yellow></span> <span class=green>                                   </span> <div class=badboy></div>    <span id=number><a href=# class=day><p class=test></p></a> </span> </li>");
        }
        else if(i%7==0){
            $('.days').append("<li class=num-day-first id ="+i+"num> <span class=red></span> <span class=yellow></span> <span                                         class=green></span> <div class=badboy></div>  <span id=number> <a href=# class=day><p class=test></p> </a></span>  </li>");         }
        else if(c==6){
            $('.days').append("<li class=num-day-last id ="+i+"num> <span class=red></span> <span class=yellow></span> <span                                         class=green></span> <div class=badboy></div>  <span id=number> <a href=# class=day><p class=test></p> </a></span>  </li>");
            c=-1;
        }

        if(i<7){
            str = i;
            $('#'+i+'num'+ ' #number').addClass('first-row');
        }else{
            str = i;
            $('#'+i+'num'+ ' #number').addClass('other');
        }
    }
    $('.days').append('<div class=badboy></div>');
}
$(function () {
    let flag =false
    let r=[],b=[],kb=[]
    let ai=true
    let number,id;
    for (let i=0;i<15;i++){
        for (let j=0;j<15;j++){
            $('<div>').addClass('chess').appendTo('.box')
                .attr('id',i+'-'+j)
            kb[i+'-'+j] = true;
        }
    }
    $('.chess').on('click',function () {
        flag = !flag
         id =$(this).attr('id')
        if ($(this).hasClass('select')){
            flag = !flag
            return
        } else {
            // if (!flag){
            //     $(this).addClass('black').addClass('select')
            //     b[id]=true
            //     delete kb[id]
            //     console.log(b);
            //     issucces(b,id);
            //     if (number == 5){
            //        window.setTimeout(function () {
            //            alert('黑棋胜利')
            //            history.go(0)
            //        },500)
            //     }
            // } else
            {
                $(this).addClass('red').addClass('select')
                r[id]=true
                delete kb[id]
                // console.log(r);
                issucces(r,id);
                if (number == 5){
                    window.setTimeout(function () {
                        alert('红棋胜利')
                        history.go(0)
                    },100)
                }
            }
            if (ai) {
                let pos =aifn();
                b[pos]=true;
                $('#'+pos).addClass('black')
                delete kb[pos]
                issucces(b,pos);
                if (number == 5){
                    window.setTimeout(function () {
                        alert('黑棋胜利')
                        history.go(0)
                    },100)
                }
                flag = !flag
            }
        }
    })

    function issucces(obj,id) {
        let sp=1,sz=1,zx=1,yx=1;
        let [x,y] = id.split('-')
        let i=x*1,j=y*1;
        // console.log(i + '-' + (++j));
        //水平
        while (obj[ i+ '-'+ (++j)]) {
            sp++
        }
        j = y*1;
        while (obj[ i+ '-'+ (--j)]) {
            sp++
        }
        //垂直
        i=x*1,j=y*1
        while (obj[(++i) + '-'+ j]) {
            sz++
        }
        i = x*1;
        while (obj[(--i) + '-'+ j]) {
            sz++
        }
        //左斜
        i=x*1,j=y*1
        while (obj[(--i) + '-'+ (++j)]) {
            zx++
        }
        j = y*1
        i = x*1;
        while (obj[(++i) + '-'+ (--j)]) {
            zx++
        }
        //右斜
        i=x*1,j=y*1
        while (obj[(--i) + '-'+ (--j)]) {
            yx++
        }
        j = y*1
        i = x*1;
        while (obj[(++i) + '-'+ (++j)]) {
            yx++
        }
        // console.log(sp,sz,zx,yx);
        number = Math.max(sp,sz,zx,yx)
        return number
    }
    
    function aifn() {
        let bmax =0,rmax =0;
        let pos1 ='',pos2 =''
        for (let i in kb){
            let score =  issucces(b,i);
            if (score >= bmax){
                bmax=score;
                pos1=i;
            }
        }
        for (let i in kb){
            let score = issucces(r,i);
            if (score >= rmax){
                rmax=score;
                pos2=i;
            }
        }
        return bmax < rmax ? pos2:pos1;
    }
})
document.addEventListener('DOMContentLoaded', () => {
    let teams = loadTeam()
    console.log(loadTeam)
    setTimeout(btn, 2500)
    function btn() {
        let save = document.querySelectorAll('#add')
        console.log(save)
        save.onclick = () => {
            console.log('tombol favorite di klik')
            teams.then((team) => {
                saveTeams(team);
            })
        }


    }

})
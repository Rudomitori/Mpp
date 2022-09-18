import {FC, useState} from "react";
import {Button, Container, Stack} from "@mui/material";
import LogsApi from "../../api/LogsApi";

interface IButtonVm {
    text: string,
    disabled: boolean,
    variant: string,
    handleClick: () => void
}

interface IPageProps {

}

const ButtonsPage: FC<IPageProps> = (props) => {
    function handleClick(index: number) {
        setVms((vms) => {
            vms = vms.slice();

            const vm = vms[index];
            vm.disabled = true;
            // noinspection JSIgnoredPromiseFromCall
            LogsApi.sendLog(`${vm.text} is clicked`);
            if (!vms.some(x => !x.disabled))
                for (const vm of vms) vm.disabled = false;

            return vms;
        });
    }

    const [vms, setVms] = useState(() => {
        const buttonVms = [
            {
                text: 'primary button',
                disabled: false,
                variant: 'primary',
                handleClick
            },
            {
                text: 'secondary button',
                disabled: false,
                variant: 'secondary',
                handleClick
            },
            {
                text: 'warning button',
                disabled: false,
                variant: 'warning',
                handleClick
            }
        ];

        for (let [i, vm] of buttonVms.entries()) {
            vm.handleClick = vm.handleClick.bind(null, i);
        }

        return buttonVms as IButtonVm[];
    });

    return (
        <Container maxWidth="md" sx={{my: 4}}>
            <Stack spacing={2} direction="row" justifyContent="center">
                {vms.map((vm, i) => (
                    <Button
                        key={i}
                        color={vm.variant as any}
                        disabled={vm.disabled}
                        onClick={vm.handleClick} variant={"contained"}>
                        {vm.text}
                    </Button>
                ))}
            </Stack>
        </Container>
    )
}

export default ButtonsPage;
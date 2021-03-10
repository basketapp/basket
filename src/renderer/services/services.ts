// TODO: Turn into magic regex array.
export default function decideService(url: string): undefined | string {
    if (url.includes('web.whatsapp.com')) {
        return 'whatsapp';
    }

    if (url.includes('slack.com')) {
        return 'slack';
    }

    if (url.includes('web.telegram.com')) {
        return 'telegram';
    }

    if (url.includes('gmail.com')) {
        return 'gmail';
    }

    if (url.includes('discord.com')) {
        return 'discord';
    }

    return undefined;
}

import codePush from 'react-native-code-push'

exports.update = () => {
  codePush.sync({
      updateDialog: {
        appendReleaseDescription: true,
        descriptionPrefix:'\n\n更新内容：\n',
        title:'更新',

        mandatoryUpdateMessage:'强制升级',
        mandatoryContinueButtonLabel:'继续',

        optionalIgnoreButtonLabel: '取消',
        optionalUpdateMessage: '更新'
      },
      installMode: codePush.InstallMode.IMMEDIATE
    });
}